const mongoose = require("mongoose");

const appointmentSchema={
    name:String,
    image:String,
    specialization:String,
    experience:Number,
    location:String,
    date:Date,
    slots:Number,
    fee:Number
};

const appointmentModel=mongoose.model("data", appointmentSchema);


module.exports={
    appointmentModel
}