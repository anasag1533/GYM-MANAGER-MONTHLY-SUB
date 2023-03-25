const notification = require('../models/notification');
const Notification = require('../models/notification');

//const {list,create,remove} = require('../controllers/notification')

exports.list = async(req,res) => {

    const notificationsList = await Notification.find().sort({'date': -1});

    if(!notificationsList)
    {
        return res.status(500).json({success:false})
    }
    res.send(notificationsList)

}

exports.create = (req,res) => {
    const notification = new Notification(req.body)

    notification.save((err,notification)=>{
        if(err)
        {
            console.log('There is an error')
            return res.status(400).json({
                error:err
            })
        }
        res.json({notification})
    })
}


exports.remove = async(req,res) => {
    Notification.findByIdAndRemove(req.params.id).then(notification => {
        if(notification)
        {
            return res.status(200).json({success:true, message:'the notification is deleted '})
        }
        else
        {
            return res.status(400).json({success:false,message:'notification not found'})
        }
    }).catch(err => {
        return res.status(400).json({success:false,error:err})
    })
}

//how do i stay motivated
//if you gotta ask then you don't fucking got it

exports.update = async(req,res) => {

    const notification = await Notification.findByIdAndUpdate(
        req.body.id,
        {
            read:req.body.read
        },
        {new:true}
    )
    if(!notification)
    {
        return res.status(400).send('the notification was not found')
    }
    res.send(notification)
}


exports.getCount = async(req,res) => {
    const notificationCount = await notification.countDocuments()
    
    if(!notificationCount)
    {
        return res.send({notificationCount:0})
    }
    return res.send({notificationCount:notificationCount})
}