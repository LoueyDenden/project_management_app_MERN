const mongoose=require('mongoose');
const User=mongoose.model('User',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})
module.exports=User;