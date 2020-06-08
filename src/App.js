import React from "react";
import "./css/App.css";
import Nav from "./components/Nav";

// Pages
import Admin from "./pages/Admin";
import Home from "./pages/Home";

// React Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <Route path="/admin" component={Admin} exact />
          <Route path="/" component={Home} exact />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
