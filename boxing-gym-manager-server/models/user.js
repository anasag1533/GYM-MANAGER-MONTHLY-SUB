const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trime:true,
        required:true,
        unique:true
    },
    address:
    {
        type:String,
        required:true,
    },
    phone:
    {
        type:String,
        required:true,
    }
   
}) 




module.exports = mongoose.model("User",userSchema);