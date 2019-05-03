import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Event from "./pages/Event";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Event} />
          {/* <Route exact path="/events" component={Event} />
          <Route exact path="/events/:id" component={Detail} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
