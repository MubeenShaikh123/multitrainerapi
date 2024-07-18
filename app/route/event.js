var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Event=require('../../model/event')

router.get("/",function(req,res,next){

    Event.find().then((result)=>{
        res.status(200).json({
            allEvent:result
        })
       })
       .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err,
    
        })
       })
})

router.post("/",function(req,res,next){
   var event= new Event({
    _id:new mongoose.Types.ObjectId,
    event_name:req.body.event_name,
    event_type:req.body.event_type,
    event_categories:req.body.event_categories,
    event_start_time:req.body.event_start_time,
    event_End_time:req.body.event_End_time

   })

   event.save().then((result)=>{
    res.status(200).json({
        newEvent:result
    })
   })
   .catch((err)=>{
    console.log(err);
    res.status(500).json({
        error:err,

    })
   })
});

router.get("/:id",function(req,res,next){
    Event.findById(req.params.id).then((result)=>{
        res.status(200).json({
            Event:result
        })
       })
       .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err,
    
        })
       })
})

router.delete("/:id",function(req,res,next){
    Event.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json({
            msg:"data deleted successfuly ",
            result:result
        })
       })
       .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err,
    
        })
       })
})

router.put("/:id",function(req,res,next){
Event.findOneAndUpdate({_id:req.params.id},{
        $set:{
    event_name:req.body.event_name,
    event_type:req.body.event_type,
    event_categories:req.body.event_categories,
    event_start_time:req.body.event_start_time,
    event_End_time:req.body.event_End_time
        }
    })
    .then((result)=>{
        res.status(200).json({
            msg:"data updated successfuly ",
            updatedProduct:result
        })
       })
       .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err,
    
        })
       })
})


module.exports=router;