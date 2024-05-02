const express=require('express');
const router=express.Router();
const Tasks=require('../models/tasks');
////////////////////////////////////////

//Sauvegarde
router.post('/add',async(req,res)=>{
    let data=req.body;
    let newTasks=new Tasks(data)
    
    newTasks.save()
    .then((saved)=>{
       filename='';
       console.log(saved);
       res.status(200).send(saved);
    })
    .catch(err=>{
        res.status(400).send(err);
    })
})

//get all tasks
router.get('/all',(req,res)=>{
    Tasks.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})
//get task by id
router.get('/get/:id',(req,res)=>{
    id=req.params.id;
    Tasks.findOne({_id:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})
//get task by user id
router.get('/gettaskbyuser/:id',(req,res)=>{
    id=req.params.id;
    Tasks.find({idUser:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//get task by project id
router.get('/gettaskbyproject/:id',(req,res)=>{
    id=req.params.id;
    Tasks.find({idProject:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//update by id 
router.put('/update/:id',async(req,res)=>{
    id=req.params.id;
    let data=req.body;

   
    Tasks.findByIdAndUpdate({_id:id},data)
    .then((task)=>{
        res.status(200).send(task);

    }).catch((err)=>{
        console.log(err);
    });

})

//delete task by id
router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    if(!id){
        res.status(400).send({
            message:" content is required!"
        });
    }
    Tasks.deleteOne({_id:id}).then((data)=>{
        if (!data){
            res.status(404).send({message:" Tasks not Found!"});
        }
        res.status(200).send({message: "Tasks Succufully deleted"});
    })
})

module.exports=router;