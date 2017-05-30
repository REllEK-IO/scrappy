var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// With our new Schema class, we instantiate an ExampleSchema object
// This is where we decide how our data must look before we accept it in the server, and how to format it in mongoDB
var CommentSchema = new Schema({
  // string must be a string. We "trim" it to remove any trailing white space
  // Notice that it is required, as well. It must be entered or else mongoose will throw an error
  article_title:{
    type: String,
    trim: true,
    required: "String is Required"
  },
  text_body: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  // This must be a unique number in the collection, and it must be entered
  date: {
    type: Date,
    default: Date.now
  }
  // Notice the validate array in this sub-object
  // This lets us make customized validation functions for our model
});

var articleComment = mongoose.model("articleComment", CommentSchema);

module.exports = articleComment;