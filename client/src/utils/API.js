import axios from "axios";
// import { func } from "prop-types";

export default {
  // Gets all events (1-3)
  getEvents: function() {
    return axios.get("/api/events");
  },
  // Gets the event with the given id (6)
  getEvents: function(id) {
    return axios.get("/api/events/" + id);
  },
  // Deletes the event with the given id
  deleteEvent: function(id) {
    return axios.delete("/api/events/" + id);
  },
  // Saves an event to the database (4)
  saveEvent: function(eventData) {
    return axios.post("/api/events", eventData);
  },
  //Get google maps for the venue location
  getMap: function(query) {
    //GoogleMap API
    // return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
  getUsers: function() {
    return axios.get("/api/user");
  },
  //Save user info (2)
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  }
  //Save conference to user id (5)
  
};
