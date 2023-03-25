const mongoose = require('mongoose');


const ownerSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
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
    },
    businessName:
    {
        type:String,
        required:true
    },
    website:
    {
        type:String,
        required:true
    },
    businessEmail:
    {
        type:String,
        required:true
    },
    businessPhone:
    {
        type:String,
        required:true
    },
    businessAddress:
    {
        type:String,
        required:true
    },
    businessZipCode:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true,
        min:6,
        max:64
    },
    stripe_customer_id:
    {
        type:String
    },
    
    subscriptions:[],

        


})
module.exports = mongoose.model("Owner",ownerSchema);