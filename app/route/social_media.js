var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var SocialMedia=require('../../model/social_media');

router.get("/",function(req,res,next){
    SocialMedia.find().then((result)=>{
        res.status(200).json({
            allSocialMedia:result
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
   var socialMedia= new SocialMedia({
    _id:new mongoose.Types.ObjectId,
    Email_Id:req.body.Email_Id,
    facebook:req.body.facebook,
    instagram:req.body.instagram,
    youtube:req.body.youtube,
    Linkdein:req.body.Linkdein,
   })

   socialMedia.save().then((result)=>{
    res.status(200).json({
        newSocialMedia:result
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
    SocialMedia.findById(req.params.id).then((result)=>{
        res.status(200).json({
            SocialMedia:result
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
    SocialMedia.deleteOne({_id:req.params.id}).then((result)=>{
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
    SocialMedia.findOneAndUpdate({_id:req.params.id},{
        $set:{
            Email_Id:req.body.Email_Id,
            facebook:req.body.facebook,
            instagram:req.body.instagram,
            youtube:req.body.youtube,
            Linkdein:req.body.Linkdein,
        }
    })
    .then((result)=>{
        res.status(200).json({
            msg:"data updated successfuly ",
            updatedsocialMedia:result
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