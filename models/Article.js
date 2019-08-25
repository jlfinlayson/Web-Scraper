// Require Mongoose Package
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
      },
    image: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  });

var Article = mongoose.model("Article", ArticleSchema)

// Export the Article model
module.exports = Article;
