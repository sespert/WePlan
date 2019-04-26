import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Convention from "./pages/Convention";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Conventions} />
          <Route exact path="/conventions" component={Conventions} />
          <Route exact path="/conventions/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
