const express=require('express');
const projectApi=require('./routes/projects');
const taskApi=require('./routes/tasks');
const userApi=require('./routes/users');
const cors=require('cors');
require('./config/connect');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/project',projectApi);
app.use('/task',taskApi);
app.use('/user', userApi);
app.listen(process.env.PORT,()=>{
    console.log('server working !'+process.env.PORT)
})