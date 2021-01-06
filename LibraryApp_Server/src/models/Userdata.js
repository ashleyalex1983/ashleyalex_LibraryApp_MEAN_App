//Access mongoose package
const mongoose = require("mongoose");

//Schema definition
const Schema = mongoose.Schema;
 
//Define structure of Userdata collection using Schema constructor
const UserSchema = new Schema({
            user_name      : { type: String , required : true},
            user_email      : { type: String , required : true},
            user_password   : { type: String , required : true},
            // user_role       : String, // admin, reader
            user_role       : { type:String , default: "reader"},
            user_createdon  : { type : Date , default: Date.now }   //Signup date
});

//Create model Userdata
var Userdata = mongoose.model('lib_user',UserSchema);

//exports
module.exports = Userdata ;

