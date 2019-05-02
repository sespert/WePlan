import axios from "axios";

export default {
  // Gets all books
  getEvents: function() {
    return axios.get("/api/events");
  },
  // Gets the book with the given id
  getCevents: function(id) {
    return axios.get("/api/events/" + id);
  },
  // Deletes the book with the given id
  deleteEvent: function(id) {
    return axios.delete("/api/events/" + id);
  },
  // Saves a book to the database
  saveEvent: function(eventData) {
    return axios.post("/api/events", eventData);
  },
  getMap: function(query) {
    //GoogleMap API
    // return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
};
