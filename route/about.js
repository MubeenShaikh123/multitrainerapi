const express=require('express');
var router= express.Router();
var mongoose=require('mongoose');
var About=require('../../model/about');


router.get("/",function(req,res,next){
    About.find().then((result)=>{
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
 var about= new About({
    _id: new mongoose.Types.ObjectId,
    about_us:req.body.about_us,
    our_services:req.body.our_services,

 })

 about.save().then((result)=>{
    console.log(result);
    res.status(200).json({
        newAbout:result
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
    About.findById(req.params.id).then((result)=>{
        console.log(result);
        res.status(200).json({
            newAbout:result
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
    About.deleteOne({_id:req.params.id}).then(result=>{
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
About.findOneAndUpdate({_id:req.params.id},{
    $set:{
        about_us:req.body.about_us,
        our_services:req.body.our_services    
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