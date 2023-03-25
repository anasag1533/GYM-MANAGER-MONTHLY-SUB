const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    
    credit:{
        type:String,
        required:true
    },
    isActive:{
        type:String,
        default:true,
    },
    expiresAt:{
        type:Date,
        min:'2022-12-07',
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
}) 




module.exports = mongoose.model("Membership",membershipSchema);