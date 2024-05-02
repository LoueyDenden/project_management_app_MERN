const mongoose=require('mongoose');
const Tasks=mongoose.model('Tasks',{
    title:{
        type:String
    },
    idUser:{
        type:String
    },
    idProject:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["to-do","doing","done"],
        default:"to-do"
    }
})
module.exports=Tasks;