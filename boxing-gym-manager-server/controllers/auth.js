const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const bcrypt = require('bcryptjs');



exports.signUp = (req,res) => 
{

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
    });
    console.log(user)
    user.save((err,user)=>{
        if(err)
        {
            console.log('There is an error')
            return res.status(400).json({
                error:err
            })
        }
        res.json({user})
    })
}


exports.signIn = async (req,res) => 
{
    const user = await User.findOne({email:req.body.email})

    const secret = process.env.SECRET;

    if(!user)
    {
        return res.status(400).send('The user was not found')
    }
    if(user && bcrypt.compareSync(req.body.password,user.hashed_password))
    {
        const token = jwt.sign(
            {
                userId:user.diffIndexes,
                isAdmin:user.isAdmin
            },
            secret,
            {expiresIn:'1d'})
        res.status(200).send({user:user.email,token:token})
    }
    else
    {
        res.status(400).send('password is wrong')
    }
}

exports.getCount = async (req,res) =>
{
    const userCount = await User.countDocuments()

    if(!userCount)
    {
        res.status(500).json({success:false})
    }
    res.send({
        userCount:userCount
    })
}

exports.userById = async (req,res) =>
{
    const user = await User.findById(req.params.id).select('-hashed_password')

    if(!user)
    {
        res.status(500).json({message:'User with given ID was not found'})
    }
    res.status(200).send(user)
}


exports.list = async(req,res) =>
{
    const userList = await User.find().select('-passwordHash');

    if(!userList)
    {
        res.status(500).json({success:false})
    }
    res.send(userList);
}

exports.remove = async (req,res) => 
{

    User.findByIdAndRemove(req.params.id).then( user => {
        if(user)
        {
            return res.status(200).json({ success : true , message : 'the user is deleted'})
        }
        else
        {
            return res.status(404).json({ success : false , message : 'user not found'})
        }
    }).catch(err => {
        return res.status(400).json({success:false,error:err})
    })
}


exports.listSearch = (req,res) =>{

    const query = {}

    if(req.query.search)
    {
        query.name=req.query.search
    }
    if(req.query.email)
    {
        query.email = req.query.email
    }
    User.find(query,(err,user)=>{
        if(err)
            return res.status(400).json({error:JSON.stringify(err)})
        
        res.json(user)
    })
}


