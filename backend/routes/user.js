// backend/routes/user.js
const express = require('express');
const z=require("zod");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const {User, Account}=require("../db");
const { JWT_SECRET } = require('../config');
const authMiddleware=require("../middleware");

const signupBody=z.object({
    username:z.string().email().min(3),
    firstName:z.string().max(50),
    lastName:z.string().max(50),
    password:z.string().min(6),
})

const signinBody=z.object({
    username:z.string().email().min(3),
    password:z.string().min(6),
})

const updateBody=z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
})

const router = express.Router();

router.post("/signup",async function (req,res){
    try {
        const {success}=signupBody.safeParse(req.body)
    
        if(!success){
            return res.status(411).json({
                message:"parsing Email already taken / Incorrect inputs"
            })
        }
    
        const existingUser=await User.findOne({
            username:req.body.username
        })
        if(existingUser){
            return res.status(411).json({
                message:"Email this already taken / Incorrect inputs"
            })
        }
    
        const user= await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        min = 1
        max = 1000000
        const value=Math.floor(Math.random() * (max - min + 1))+min;
        console.log(value);
        await Account.create({
            userId:user._id,
            balance:value,
        })
    
        const userId=user._id;
        const token=jwt.sign({
            userId
        },JWT_SECRET);
    
        res.json({
            message:"User created successfully",
            token:token,
            value:value,
            _id:user._id
        })
        
    } catch (error) {
        console.log("Some Error Occured");
    }
});

router.get('/detail', authMiddleware,async function (req,res){
    try {
        const user=await User.findById(req.userId);
        if(user){
            return res.status(200).json({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName 
            });
        }
        return res.status(411).json({
            message:"No user exist"
        })
        
    } catch (error) {
        console.log("Could not fetch User");     
    }
    
})

router.post('/signin',async function(req,res){
    try {
        const {success}=signinBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message:"Incorrect Inputs"
            })
        }
    
        const user=await User.findOne({
            username:req.body.username,
            password:req.body.password
        })
    
        if(user){
            const token=jwt.sign({
                userId:user._id
            },JWT_SECRET);
    
            res.json({
                token:token,
                _id:user._id

            })
            return;
        }
    
        return res.status(411).json({
            message:"Error while loging in"
        })
        
    } catch (error) {
        console.log("Some Error Occured");   
    }

});

router.put('/',authMiddleware,async function(req,res){

    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Error while updating information"
        })
    }
    await User.updateOne(req.body,{
        _id:req.userId
    })

    res.json({
        message:"Updated successfully"
    })
})

router.get('/bulk',authMiddleware,async function(req,res){
    const currentUserId = (req.userId);  

    
    const filter = req.query.filter || '';  
    const users = await User.find({
        $and: [
            {
                _id: { $ne: currentUserId }
            },
            {
                $or: [
                    { firstName: { $regex: filter, $options: 'i' } },  // 'i' for case-insensitive search
                    { lastName: { $regex: filter, $options: 'i' } }
                ]
            }
        ]
    });
    
    res.status(200).json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    });
})
module.exports = router;