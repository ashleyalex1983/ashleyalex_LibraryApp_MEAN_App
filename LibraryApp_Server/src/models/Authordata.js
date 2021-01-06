//Access mongoose package
const mongoose = require("mongoose");

//Schema definition
const Schema = mongoose.Schema;

//Define structure of Authordata collection using Schema constructor
const AuthorSchema = new Schema({
            author_name         : String,
            author_nationality  : String,
            author_dob          : String,
            author_genre        : String,
            author_imageUrl     : String
            // author_image        : { data: Buffer, contentType: String }
});

//Create model Authordata
var Authordata = mongoose.model('lib_author',AuthorSchema);

//exports
module.exports = Authordata ;