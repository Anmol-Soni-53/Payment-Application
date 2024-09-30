const express = require('express');
const z=require("zod");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const {Account}=require("../db");
const { JWT_SECRET } = require('../config');
const authMiddleware=require("../middleware");

router.get('/balance',authMiddleware,async function(req,res){
    const account=await Account.findOne({
        userId:req.userId,
    });
    res.json({
        balance:account.balance
    })
})

router.get('/transfer',authMiddleware,async function(req,res){

    const session= await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;

    const account=await Account.findOne({
        userId:req.userId,
    }).session(session);

    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        });
    }
    const toAccount=await Account.findOne({
        userId:to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    //.session(session-> declared variable above) ensures that these operation are part of a session

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction();

    res.json({
        message:"Transfer Successful"
    });
})

