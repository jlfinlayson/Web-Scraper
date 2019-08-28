// Require Mongoose Package
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author: String,
    body: String
});

var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;