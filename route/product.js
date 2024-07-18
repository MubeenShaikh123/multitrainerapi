var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Product=require("../../model/product");

router.get("/",function(req,res,next){

    Product.find().then((result)=>{
        res.status(200).json({
            allProduct:result
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
   var product= new Product({
    _id:new mongoose.Types.ObjectId,
    Products_info:req.body.Products_info,
    Product_name:req.body.Product_name,
    Product_Prize:req.body.Product_Prize
   })

   product.save().then((result)=>{
    res.status(200).json({
        newProduct:result
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
    Product.findById(req.params.id).then((result)=>{
        res.status(200).json({
            Product:result
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
    Product.deleteOne({_id:req.params.id}).then((result)=>{
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
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{
            Products_info:req.body.Products_info,
            Product_name:req.body.Product_name,
            Product_Prize:req.body.Product_Prize
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