import axios from "axios";
import { func } from "prop-types";

export default {
  // Gets all events
  getEvents: function() {
    return axios.get("/api/events");
  },
  // Gets the event with the given id
  getEvents: function(id) {
    return axios.get("/api/events/" + id);
  },
  // Deletes the event with the given id
  deleteEvent: function(id) {
    return axios.delete("/api/events/" + id);
  },
  // Saves an event to the database
  saveEvent: function(eventData) {
    return axios.post("/api/events", eventData);
  },
  //Get google maps for the venue location
  getMap: function(query) {
    //GoogleMap API
    // return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
  //Save user info
  saveUserRole: function() {

  },
  //Save info of the event
  saveEventInfo: function() {
    
  }
};
