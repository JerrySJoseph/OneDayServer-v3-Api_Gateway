//Importing Required libraries
const router=require('express').Router();
const Queue=require('../Utils/RMQConnection')
const log=require('../Utils/log')
const {PushRequest}=require('../Utils/RequestHandler');
const validator = require('../Utils/Validator');

//Cached Channel
let channel=null;

//MiddleWare to ensure Channel is established;
function getChannel(req,res,next) {
    try {
          //Validate information payload
        const {error}=getVallidator(req)
        if(error)
            return res.status(200).send(
                      {
                          "success":false,
                            "message":error.details[0].message
                      })

      if(channel==null)
        Queue.getMyConnection.then((connection)=>{
          log.info('Queue Connected');
          connection.createChannel((error0,ch)=>{
            if(error0)return log.error(error0)
            log.info('channel created')
            channel=ch;
            getChannel(req,res,next);
          })
        }).catch((error)=>{
          log.error(error)
        })
      
      else
        next();
    } catch (error) {
      return res.status(406).send(
                      {
                          "success":false,
                            "message":error
                      })
    }  
     
  
}

//get different validators for different routes
function getVallidator(req)
{
  switch (req.route.path) {
    case '/create':return validator.createProfileValidator(req.body.data);    
      break;
    case '/update':return validator.updateProfileValidator(req.body.data);    
      break;
    case '/delete':return validator.deleteProfileValidator(req.body.data);    
      break;
  }
}

//Route Functions  
const createRoute=async(req,res)=>{

  try {
    const params={
        exchange:'user',
        routingKey:'user.event.create',
        requestID:req.body.requestID,
        data:JSON.stringify(req.body.data)
      };
  PushRequest(params,channel,(result)=>{
            res.send(result);
          })
  } catch (error) {
     log.error(error)
  }
  
 }

  const updateRoute=async(req,res)=>{
    try {
      const params={
          exchange:'user',
          routingKey:'user.event.update',
          requestID:req.body.requestID,
          data:JSON.stringify(req.body.data)
        };
   PushRequest(params,channel,(result)=>{
              res.send(result);
            })
    } catch (error) {
       log.error(error)
    }
   
  }

  const deleteRoute=async(req,res)=>{
    try {
      const params={
          exchange:'user',
          routingKey:'user.event.delete',
          requestID:req.body.requestID,
          data:JSON.stringify(req.body.data)
        };
   PushRequest(params,channel,(result)=>{
              res.send(result);
            })
    } catch (error) {
      log.error(error)
    }
   
  }

//Create Profile Route
router.post('/create',getChannel,createRoute)

//Update Profile Route
router.post('/update',getChannel,updateRoute)

//Delete Profile Route
router.post('/delete',getChannel,deleteRoute)

module.exports=router