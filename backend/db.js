const mongoose=require("mongoose");
const { number } = require("zod");
mongoose.connect("mongodb+srv://anmol5304:xljhHPKjScP2yd6U@cluster0.lairh.mongodb.net/payTm")

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    }
});

const accountSchema=new Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
        type:number,
        required:true
    }
})

const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('User',userSchema);

module.exports={
    User,Account
}


