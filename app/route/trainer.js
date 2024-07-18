const express=require('express');
var router= express.Router();
var mongoose=require('mongoose');
var Trainer=require('../../model/trainer');
const trainer = require('../../model/trainer');

router.get("/",function(req,res,next){
  Trainer.find().then((result)=>{
    res.status(200).json({
        trainerData:result
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
})

router.post("/",function(req,res,next){
 var trainer= new Trainer({
    _id: new mongoose.Types.ObjectId,
    class_name:req.body.class_name,
    trainer_name:req.body.trainer_name,
    rating:req.body.rating,
    rating_count:req.body.rating_count,
    address:req.body.address,
    mobile_number:req.body.mobile_number,
    profil_share:req.body.profil_share
 })

 trainer.save().then((result)=>{
    console.log(result);
    res.status(200).json({
        newTrainer:result
    })
 })
 .catch((err)=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
 })
})

router.get('/:id',function(req,res,next){
    console.log(req.params.id);
    trainer.findById(req.params.id).then((result)=>{
        console.log(result);
        res.status(200).json({
            newTrainer:result
        })
     })
     .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
})

router.delete("/:id",function(req,res,next){
    Trainer.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json({
            msg:"data succesfully deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})
router.put("/:id",function(req,res,next){
// console.log(req.params.id);
Trainer.findOneAndUpdate({_id:req.params.id},{
    $set:{
        class_name:req.body.class_name,
        trainer_name:req.body.trainer_name,
        rating:req.body.rating,
        rating_count:req.body.rating_count,
        address:req.body.address,
        mobile_number:req.body.mobile_number,
        profil_share:req.body.profil_share
    }
})
.then(result=>{
    res.status(200).json({
        msg:"data succesfully updated",
        result:result
    })
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
})
})

module.exports=router;