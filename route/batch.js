var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Batch=require('../../model/batch');


var multer=require('multer');
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/uploads/')
  },
  filename:function(req,file,cb){
    cb(null,+Date.now()+file.originalname)
  }
})

const filefilter=(req,file,cb)=>{
if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
  cb(null,true)
}
else{
  cb(null,false)
}
}

var upload=multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*5
  },
  fileFilter:filefilter
});

router.get("/", function (req, res, next) {
    Batch.find()
    .then((result) => {
      res.status(200).json({
        BatchData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


//insert data into database
router.post("/",upload.single('batch_image'),function (req, res, next) {
    console.log(req.file);
    var batch = new Batch({
    _id: new mongoose.Types.ObjectId(),
    Batch_categories: req.body.Batch_categories,
    batch_name: req.body.batch_name,
    trainer_name: req.body.trainer_name,
    progress: req.body.progress,
    batch_image:req.file.path
  });

  batch
    .save()
    .then((result) => {
      console.log(result);

      res.status(200).json({
        newBatch: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


//single data access
router.get("/:id", function (req, res, next) {
    Batch.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        Batch: result,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// delete api request

router.delete("/:id",function(req,res,next){
    Batch.deleteOne({_id:req.params.id}).then(result=>{
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

});

// update api 

router.put("/:id",upload.single('batch_image'),function(req,res,next){
    Batch.findOneAndUpdate({_id:req.params.id},{
    $set:{
    Batch_categories: req.body.Batch_categories,
    batch_name: req.body.batch_name,
    trainer_name: req.body.trainer_name,
    progress: req.body.progress,
    batch_image:req.file.path
    }
}) 
.then(result=>{  
    res.status(200).json({
        updatedData:result
    })
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
})
});



module.exports = router;

// mongodb://localhost:27017
