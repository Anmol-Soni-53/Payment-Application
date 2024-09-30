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
    password:z.string().optional().min(6),
    firstName:z.string().optional().max(50),
    lastName:z.string().optional().max(50),
})

const router = express.Router();

router.post("/signup",async function (req,res){
    const {success}=signupBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }

    const existingUser=await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }

    const user= await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    await Account.create({
        userId:user._id,
        balance:1+Math.random()*1000
    })

    const userId=user._id;
    const token=jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    })
});

router.post('/signin',async function(req,res){

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
            token:token
        })
        return;
    }

    return res.status(411).json({
        message:"Error while loging in"
    })

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
    const filter=req.query.filter || "";
    const users= await User.find({
        $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
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