var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Testimonial = require("../../model/testmonial");

router.get("/", function (req, res, next) {
  Testimonial.find()
    .then((result) => {
      res.status(200).json({
        alltestmonials: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", function (req, res, next) {
  var testmonial = new Testimonial({
    _id: new mongoose.Types.ObjectId(),
    Testimonial: req.body.Testimonial,
    Testimonial_Autor_Name: req.body.Testimonial_Autor_Name,
  });

  testmonial
    .save()
    .then((result) => {
      res.status(200).json({
        newtestmonial: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", function (req, res, next) {
  Testimonial.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        testmonial: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", function (req, res, next) {
  Testimonial.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        msg: "data deleted successfuly ",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", function (req, res, next) {
  Testimonial.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        Testimonial: req.body.Testimonial,
        Testimonial_Autor_Name: req.body.Testimonial_Autor_Name,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        msg: "data updated successfuly ",
        updatedTestmonial: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
