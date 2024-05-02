const express=require('express');
const router=express.Router();
const User=require('../models/users');
const bcrypt=require('bcrypt');
const jWt=require('jsonwebtoken');


//creation
router.post('/register',async (req,res)=>{
    data=req.body;
    let newUser=new User(data);

    salt=bcrypt.genSaltSync(10);
    newUser.password=bcrypt.hashSync(data.password,salt);

    newUser.save()
    .then((savedUser)=>{
        filename='';
        res.status(200).send(savedUser);
    })
    .catch(err=>{
        res.status(400).send(err);
    })
})

//login

router.post('/login',(req,res)=>{
    data=req.body;
    User.findOne({email:data.email})
    .then(
        (user)=>{
            let valid=bcrypt.compareSync(data.password,user.password);
            if(!valid){
                res.status(404).send('email or password invalid!')
            }else{
                let payload={
                    _id:user.id,
                    email:user.email,
                    fullname:user.name+' '+user.lastname
                }
                let token=jWt.sign(payload,'123456789');
                res.status(200).send({mytoken:token})
            }
        }
    )
    .catch(
        err=>{
            res.status(400).send(err);
        }
    )
})

//gett all users
router.get('/all',(req,res)=>{
    User.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//get user by id 
router.get('/get/:id',(req,res)=>{
    id=req.params.id;
    User.findOne({_id:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//delete user by id
router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    if(!id){
        res.status(400).send({
            message:" content is required!"
        });
    }
    User.deleteOne({_id:id}).then((data)=>{
        if (!data){
            res.status(404).send({message:" User not Found!"});
        }
        res.status(200).send({message: "User Succufully deleted"});
    })
})


//update user
router.put('/update/:id',(req,res)=>{
    id=req.params.id;
    let data=req.body;
    if (data.password!=undefined){
        salt=bcrypt.genSaltSync(10);
    data.password=bcrypt.hashSync(data.password,salt);
    }
  
    User.findByIdAndUpdate({_id:id},data)
    .then((user)=>{
            res.status(200).send(user);
    }).catch((err)=>{
        console.log(err);
    });

})
module.exports=router;
