var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Gallary = require('../../model/gallary');
var multer = require('multer');


// Set up storage and file naming
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filefilter
});

// Get all gallery data
router.get("/", function (req, res, next) {
  Gallary.find()
    .then((result) => {
      res.status(200).json({
        GallaryData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


// Insert data into database
router.post("/", upload.array('photos', 5), function (req, res, next) {
  console.log(req.file);

  var gallary = new Gallary({
    _id: new mongoose.Types.ObjectId(),
    photos: req.files.map(file => file.path) // Save an array of file paths
  });

  gallary
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newimages: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Single data access
router.get("/:id", function (req, res, next) {
  Gallary.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        Gallary: result,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Delete API request
router.delete("/:id", function (req, res, next) {
  Gallary.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      msg: "Data successfully deleted",
      result: result
    });
  })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Update API 
router.put("/:id", upload.array('photos', 3), function (req, res, next) {
  Gallary.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      photos: req.files.map(file => file.path) // Update with an array of file paths
    }
  })
    .then(result => {
      res.status(200).json({
        updatedData: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
