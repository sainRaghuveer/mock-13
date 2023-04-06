const express=require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRoute=express.Router();

userRoute.post("/signup", async(req,res)=>{
    const {email, password, confirmPassword} = req.body;

    try{
        const userExist=await userModel.findOne({email});
        if(userExist){
            res.send("email exist, login please")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
               if(err){
                    res.send({"msg":"please enter valid credentials", "status":false})
                }else{
                    const user=new userModel({email, confirmPassword, password:hash});
                    user.save();
                    res.send({"msg":"User registered successful", "status":true})
                }
            });
        }
    }catch(error){
        console.log({"msg":error.message});
    }
});

userRoute.post("/login", async(req,res)=>{
    const {email, password} = req.body;

    try{
        const userExist=await userModel.findOne({email});
        if(userExist){
            bcrypt.compare(password, userExist.password, async(err, result)=> {
                if(result){
                    var token = jwt.sign({userExist: userExist._id}, 'hospital', { expiresIn: "3h" });
                    res.send({"msg":"user logged in successful", "token":token, "status":true})

                }else{
                    res.send({"msg":"Wrong password or email", "status":false})
                }
            });
        }else{
            res.send({"msg":"Wrong email","status":false})
        }
    }catch(error){
        console.log({"msg":error.message});
    }
});






module.exports={
    userRoute
}