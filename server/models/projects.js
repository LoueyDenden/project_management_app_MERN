const mongoose=require('mongoose');
const Projects=mongoose.model('Projects',{
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:String
    }
})
module.exports=Projects;