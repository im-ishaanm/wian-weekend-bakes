import React from "react";
import "./css/App.css";
import Nav from "./components/Nav";

// Pages
import Admin from "./pages/Admin";
import Home from "./pages/Home";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/admin" component={Admin} exact />
        <Route path="/" component={Home} exact />
      </div>
    </Router>
  );
}

export default App;
