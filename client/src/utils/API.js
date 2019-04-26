import axios from "axios";

export default {
  // Gets all books
  getConventions: function() {
    return axios.get("/api/conventions");
  },
  // Gets the book with the given id
  getConvention: function(id) {
    return axios.get("/api/conventions/" + id);
  },
  // Deletes the book with the given id
  deleteConvention: function(id) {
    return axios.delete("/api/conventions/" + id);
  },
  // Saves a book to the database
  saveConvention: function(conventionData) {
    return axios.post("/api/conventions", conventionData);
  }
};
