const mongoose = require("mongoose");

const userSchema={
    email:String,
    password:String,
    ConfirmPassword:String
};

const userModel=mongoose.model("user", userSchema);


module.exports={
    userModel
}