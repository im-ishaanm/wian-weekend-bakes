const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");

const app = require("express")();
const cors = require("cors");

// Firebase serve [delete before production]
var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wian-weekend-bakes.firebaseio.com",
  storageBucket: "wian-weekend-bakes.appspot.com",
});

var firebaseConfig = {
  apiKey: "AIzaSyAPnTvOXzAdQORTICvkDSoCuJFW5FnW5Hs",
  authDomain: "wian-weekend-bakes.firebaseapp.com",
  databaseURL: "https://wian-weekend-bakes.firebaseio.com",
  projectId: "wian-weekend-bakes",
  storageBucket: "wian-weekend-bakes.appspot.com",
  messagingSenderId: "510966204002",
  appId: "1:510966204002:web:a399b2b72cd5f562ea733b",
  measurementId: "G-70EZE6S8Y3",
};

firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

app.use(cors());

// Check for Empty
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

// Get items
app.get("/items", (req, res) => {
  db.collection("items")
    .get()
    .then((data) => {
      let item_list = [];
      data.forEach((doc) => {
        item_list.push({
          itemId: doc.id,
          name: doc.data().name,
          desc: doc.data().desc,
          price: doc.data().price,
          imageUrl: doc.data().imageUrl,
          imageUploaded: doc.data().imageUploaded,
        });
      });
      return res.json(item_list);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

// Get single item
app.get("/item/:itemId", (req, res) => {
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      return res.json({
        itemId: doc.id,
        name: doc.data().name,
        desc: doc.data().desc,
        price: doc.data().price,
        imageUrl: doc.data().imageUrl,
        imageUploaded: doc.data().imageUploaded,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

// Create an item
app.post("/item/create", (req, res) => {
  let newItem = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
  };

  // Error Handling
  let errors = {};
  if (isEmpty(newItem.name)) errors.name = "Cannot be empty";
  if (isEmpty(newItem.price)) errors.price = "Cannot be empty";
  if (isEmpty(newItem.desc)) errors.desc = "Cannot be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  // No image on create
  newItem.imageUploaded = false;

  db.collection("items")
    .add(newItem)
    .then((doc) => {
      newItem.itemId = doc.id;
      return res.json(newItem);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);

// Add image to item
app.post("/item/image/:itemId", (req, res) => {
  let imageFileName;
  let imageToBeUploaded = {};

  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    imageFileName = `${Math.round(Math.random() * 10000)}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);

    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const newImageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/items/${req.params.itemId}`).update({
          imageUrl: newImageUrl,
          imageUploaded: true,
        });
      })
      .then(() => {
        return res.json({ message: "Image updated!" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
});

// Delete an Item
app.delete("/item/:itemId", (req, res) => {
  const document = db.doc(`/items/${req.params.itemId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
      return document.delete();
    })
    .then(() => {
      return res.json({ success: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

// Update an Item

app.post("/item/update/:itemId", (req, res) => {
  let updatedItem = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
  };
  db.doc(`/items/${req.params.itemId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }

      if (isEmpty(updatedItem.name)) updatedItem.name = doc.data().name;
      if (isEmpty(updatedItem.desc)) updatedItem.desc = doc.data().desc;
      if (isEmpty(updatedItem.price)) updatedItem.price = doc.data().price;

      doc.ref.update({
        name: updatedItem.name,
        desc: updatedItem.desc,
        price: updatedItem.price,
      });
      updatedItem.itemId = doc.id;
      updatedItem.imageUploaded = doc.data().imageUploaded;
      updatedItem.imageUrl = doc.data().imageUrl;
      return res.json(updatedItem);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

// Post an order
app.post("/order/create", (req, res) => {
  let newOrder = {
    total: req.body.total,
    phone: req.body.phone,
    name: req.body.name,
    items: req.body.items,
    addLone: req.body.addLone,
    addLtwo: req.body.addLtwo,
    addLthree: req.body.addLthree,
    submittedOn: new Date().toISOString(),
  };
  db.collection("orders")
    .add(newOrder)
    .then((doc) => {
      newOrder.orderID = doc.id;
      return res.json(newOrder);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

// Get all orders
app.get("/orders", (req, res) => {
  db.collection("orders")
    .orderBy("submittedOn", "desc")
    .get()
    .then((data) => {
      let Orders = [];
      data.forEach((doc) => {
        let order = {};
        order = doc.data();
        order.orderID = doc.id;
        Orders.push(order);
      });
      return res.json(Orders);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

app.delete("/order/:orderId", (req, res) => {
  const document = db.doc(`/orders/${req.params.orderId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Order not found" });
      }
      return document.delete();
    })
    .then(() => {
      return res.json({ success: "Order deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
