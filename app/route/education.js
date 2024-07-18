var express= require('express');
var router= express.Router();
var mongoose=require('mongoose');
var Education=require("../../model/education");

router.get("/",function(req,res){
    Education.find().then((result)=>{
        res.status(200).json({
            educationData:result
        })
     })
     .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
})

router.post("/",function(req,res){
 var education=new Education({
    _id: new mongoose.Types.ObjectId,
    school:req.body.school,
    college:req.body.college,
    degree:req.body.degree,
    other_details:req.body.other_details,
    achievements:req.body.achievements
 })

 education.save().then((result)=>{
    // console.log(result);
    res.status(200).json({
        newEducationDetail:result
    })
 })
 .catch((err)=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
 })
});

router.get("/:id",function(req,res,next){
    Education.findById(req.params.id).then((result)=>{
       
        res.status(200).json({
            education:result
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

    Education.deleteOne({_id:req.params.id}).then((result)=>{
       
        res.status(200).json({
            msg:"data deleted successfully",
            result:result
        })
     })
     .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
})

router.put("/:id",function(req,res,next){
    Education.findOneAndUpdate({_id:req.params.id},{
        $set:{
            school:req.body.school,
            college:req.body.college,
            degree:req.body.degree,
            other_details:req.body.other_details,
            achievements:req.body.achievements
        }
    })
    .then((result)=>{
       
        res.status(200).json({
            msg:"data updated successfully",
            updatedData:result
        })
     })
     .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
})

module.exports=router;
