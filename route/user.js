var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User=require('../../model/user')

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
  User.find()
    .then((result) => {
      res.status(200).json({
        UserData: result,
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
router.post("/",upload.single('users_image'),function (req, res, next) {
    console.log(req.file);
  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    users_name: req.body.users_name,
    rating_in_star: req.body.rating_in_star,
    reviews: req.body.reviews,
    Date: req.body.Date,
    users_image:req.file.path

  });

  user
    .save()
    .then((result) => {
      console.log(result);

      res.status(200).json({
        newUser: result,
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
    User.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        User: result,
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
    User.deleteOne({_id:req.params.id}).then(result=>{
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

// update api 

router.put("/:id",upload.single('users_image'),function(req,res,next){
    User.findOneAndUpdate({_id:req.params.id},{
    $set:{
        users_name: req.body.users_name,
        rating_in_star: req.body.rating_in_star,
        reviews: req.body.reviews,
        Date: req.body.Date,
        users_image:req.file.path
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
