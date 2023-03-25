const Membership = require('../models/membership')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt');




exports.list = async(req,res) => {

    const membershipList = await Membership.find().populate('user');

    if(!membershipList)
    {
        res.status(500).json({success:false})
    }
    res.send(membershipList);
}


exports.create = (req,res) => {
    const membership = new Membership(req.body)

    membership.save((err,membership)=>{
        if(err)
        {
            console.log('There is an error' + JSON.stringify(err))
            return res.status(400).json({
                error:err
            })
        }
        res.json({membership})
    })
}

exports.getCount = async (req,res) => 
{
    const membershipCount = await Membership.countDocuments()

    if(!membershipCount)
    {
        res.status(500).json({success:false})
    }
    res.send({
        membershipCount:membershipCount
    })
}

exports.remove = async(req,res) => 
{
    Membership.findByIdAndRemove(req.params.id).then(membership => {
        if(membership)
        {
            return res.status(200).json({success:true, message : 'the membership is deleted'})
        }
        else
        {
            return res.status(404).json({success:false, message : 'membership not found'})
        }
    }).catch(err=> {
        return res.status(400).json({success:false,error:err})
    })
}

exports.membershipById = async(req,res) => {

    const membership = await Membership.findById(req.params.id)
    if(!membership)
    {
        res.status(500).json({message:'Membership with given ID was not found'})
    }
    res.status(200).send(membership);
}


exports.listSearch = (req,res) =>{

    const query = {}

    if(req.query.search)
    {
        query.user = req.query.search
    }
    if(req.query.user)
    {
        query.user = req.query.user
    }
    Membership.find(query,(err,membership) =>{
        if(err){
            return res.status(400).json({error:JSON.stringify(err)})
        }
        res.json(membership)
    }).populate('user')
}



exports.findMembership = async (req,res) =>{

    const query = {};

    if(req.body.email)
    {
        query.email = req.body.email
    }

    let userId = await User.find(query).select("_id");
    
    //console.log(userId);
    
    if(userId)
    {   
        query.user = userId;
        //console.log(query.user);
        Membership.find(query,(err,membership)=>{
            if(err)
            {
                return res.status(400).json({error:JSON.stringify(err)});
            }
            console.log(membership)
            return res.json(membership);

        });
    }
    
}