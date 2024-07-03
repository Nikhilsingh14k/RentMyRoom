const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing=require("./listing.js")
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  cart:[
    {
      type:Schema.Types.ObjectId,
      ref:"Listing"
    }
  ],
  
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);