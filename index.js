const express=require("express");
const cors=require("cors");
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { appointmentRoute } = require("./routes/appointment.route");
require('dotenv').config();
const app=express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Welcome to Masai Hospital Backend")
})

app.use("/user", userRoute);

app.use("/appointment", appointmentRoute)

app.listen(process.env.port, async()=>{

    try{
        await connection;
        console.log("connected with masai hospital db")
    }catch(error){
        console.log(error)
    }

    console.log(`server is running at PORT ${process.env.port}`)
})