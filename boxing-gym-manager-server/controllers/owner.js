import Owner from "../models/owner"
import Schedule from "../models/schedule";
import { hashPassword , comparePassword } from '../helpers/auth';

import jwt from 'jsonwebtoken';
import user from "../models/user";
import multer from 'multer';

const stripe = require('stripe')(process.env.STRIPE_SECRET)


export const register = async (req,res) => {

    try{
        const {name,lastName,email
            ,phone,address,zipcode,
            password,businessName,
            businessPhone,website,
            businessEmail,businessAddress,
            businessZipCode} = req.body;

            const exist = await Owner.findOne({email});

            if(exist)
            {
                return res.json({
                    error:"Email is already taken"
                })
            }

            //hash the password
            const hashedPassword = await hashPassword(password);

            //create account in stripe

            const customer = await stripe.customers.create({
                email,
            })
            console.log('stripe customer created on signup');

            try
            {
                const owner = await new Owner({
                    name,
                    lastName,
                    email,
                    phone,
                    address,
                    zipcode,
                    password:hashedPassword,
                    businessName,
                    businessPhone,
                    website,
                    businessEmail,
                    businessAddress,
                    businessZipCode,
                    stripe_customer_id:customer.id,

                }).save();

                const token = jwt.sign({_id:owner._id},process.env.JWT_SECRET,{
                    expiresIn:'7d'
                })

                const {password, ...rest} = owner._doc;

                return res.json({
                    token,
                    owner:rest
                })
            }
            catch(err)
            {
                console.log(err)
            }
    }   
    catch(err)
    {
        console.log(err);
    }
}


export const login = async(req,res) => {

    try
    {
        const owner = await Owner.findOne({email:req.body.email})

        if(!owner)
        {
            return res.json({
                error:"Owner not found"
            })
        }

        const match = await comparePassword(req.body.password,owner.password);

        if(!match)
        {
            return res.json({
                error:'Wrong password'
            })
        }

        const token = jwt.sign({_id:user._id} , process.env.JWT_SECRET,{
            expiresIn:'7d'
        });

        const {password,...rest} = owner._doc;

        res.json({
            token,
            owner:rest
        })
    }
    catch(err)
    {   
        console.log(err);
    }
}


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads/');
    },
    filename:(req,file, cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({storage:storage}).single('image');


export const uploadSchedule = async(req,res) => 
{
    upload(req,res,(err)=>{
        if(err)
        {
            res.status(500).json({error:err.message});
        }
        else
        {
            console.log(`/${req.file.path}`);
            res.json({imagePath:`/${req.file.path}`});
            const schedule = new Schedule({
                fileName : req.file.filename
            })
        
            schedule.save((err,data)=>{
                if(err)
                {
                    console.log(err);
                    res.status(500).json({message:`Error uploading file : ${JSON.stringify(err)}`});
                }
                else
                {
                    res.status(200).json({message:'Image uploaded successfully'})
                }
            })
        }
    })

    
}



export const getLatestUploadImage = async(req,res) =>
{
    try
    {
        const schedule = Schedule.findOne().sort({dateUploaded:-1});
        const imagePath = path.join(__dirname,'../uploads/',fileName);

        res.sendFile(imagePath)
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:'Server internal error'})
    }
}