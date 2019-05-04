import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Event from "./pages/Event";
import Questions from "./pages/Questions";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Event} />
          <Route exact path="/user" component={Questions} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
