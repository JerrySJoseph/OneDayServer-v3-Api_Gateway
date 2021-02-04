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
        const {error}=validator.matchValidator(req.body.data)
        if(error)
            return res.status(406).send(
                      {
                          "success":false,
                            "msg":error.details[0].message
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
                            "msg":error
                      })
    }  
     
  
}


//Route Functions  
const generatematchRoute=async(req,res)=>{
  const params={
        exchange:'match',
        routingKey:'match.event.generate',
        requestID:req.body.requestID,
        data:JSON.stringify(req.body.data)
      };
  PushRequest(params,channel,(result)=>{
            res.send(result);
          })
 }
const fetchmatchRoute=async(req,res)=>{
  const params={
        exchange:'match',
        routingKey:'match.event.fetch',
        requestID:req.body.requestID,
        data:JSON.stringify(req.body.data)
      };
  PushRequest(params,channel,(result)=>{
            res.send(result);
          })
 }
//Generate Match Route
router.post('/generate',getChannel,generatematchRoute)
//Generate Match Route
router.post('/fetch',getChannel,fetchmatchRoute)

module.exports=router