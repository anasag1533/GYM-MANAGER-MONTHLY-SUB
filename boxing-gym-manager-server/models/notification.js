const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    
    message:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        default:Date.now()
    },
    type:
    {
        type:String,
        required:true,
    },
    read:
    {
        type:Boolean,
        //required:true
    }

}) 




module.exports = mongoose.model("Notification",notificationSchema);