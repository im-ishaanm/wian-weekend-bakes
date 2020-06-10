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

// Material UI stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const themeData = {
  palette: {
    primary: {
      light: "#48cae4",
      main: "#0096c7",
      dark: "#023e8a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6b6b",
      main: "#d00000",
      dark: "#6a040f",
      contrastText: "#fff",
    },
  },
};

const theme = createMuiTheme(themeData);

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Nav />
            <Route path="/admin" component={Admin} exact />
            <Route path="/" component={Home} exact />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
