import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Event from "./pages/Event";
import Register from "./pages/Register";
import List from "./pages/List";
import Admin from "./pages/Admin";
import AdminEvent from "./pages/AdminEvent";
import SingleEvent from "./pages/SingleEvent";
import UserEvent from "./pages/UserEvent";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Event} />
          <Route path="/register" component={Register} />
          <Route exact path="/events" component={List} />
          <Route exact path="/admin" component={Admin} />
          {/* <Route exact path="/admin/:token" component={Admin} /> */}
          <Route path="/admin/events/:id" component={AdminEvent} />
          <Route path="/events/:id" component={SingleEvent} />          
          <Route path="/user/event/:id" component={UserEvent} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
