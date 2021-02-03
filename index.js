//Importing Libraries
const express=require('express');
const Queue=require('./Utils/RMQConnection')
const log=require('./Utils/log');
//Some New Edit

//Importing Routers
const profileRouter=require('./Routes/profileRouter');
const chatRouter=require('./Routes/chatRouter');
const creditRouter=require('./Routes/creditRouter');
const matchRouter=require('./Routes/matchRouter');
const { isAuthorized } = require('./Utils/Authorization');

//Initialising Express Server
const app=express();

//NEW COMmiR


//Initialising Queue for inter Service communications
Queue.getMyConnection
    .then(()=>log.info('GATEWAY QUEUE STARTED'))
    .catch((err)=>log.error(err))

//Defininng port for API Gateway
const PORT= process.env.PORT || 3000

//Current Version of the API
const version='v2'

app.use(express.json())

//Routes
//TODO: Add isAuthorized Middleware before deploying to production
app.use(`/api/${version}/profile`,profileRouter)
app.use(`/api/${version}/chat`,isAuthorized,chatRouter)
app.use(`/api/${version}/credit`,isAuthorized,creditRouter)
app.use(`/api/${version}/match`,matchRouter)

//Listening to PORT for requests
app.listen(PORT,(err)=>log.entry("Application has started in PORT:"+PORT))
module.exports.Queue=Queue;