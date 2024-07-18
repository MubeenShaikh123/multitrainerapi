
var express=require('express');
var app=express();

var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());


var trainerRoute=require('./route/trainer')
app.use('/trainer',trainerRoute)

var educationRoute=require('./route/education');
app.use('/education',educationRoute);

var productRoute=require('./route/product');
app.use("/product",productRoute);

var testemonialRoute=require('./route/testmonial')
app.use("/testmonial",testemonialRoute);

var eventSchema=require('./route/event');
app.use("/event",eventSchema);

var socialMediaSchema=require('./route/social_media');
app.use("/socialMedia",socialMediaSchema);

var userRout=require('./route/user');
app.use("/user",userRout);

var batchRoute=require('./route/batch');
app.use("/batch",batchRoute);

var aboutRoute=require('./route/about');
app.use("/about",aboutRoute);

var gallaryRoute=require('./route/gallary');
app.use('/gallary',gallaryRoute);

var mongoose= require('mongoose');
// mongoose.connect('mongodb://localhost:27017/bhoj_soft_solution').then(function(){
mongoose.connect(process.env.MONGO_URL).then(function(){
    console.log("connection successful");
})
.catch(function(error){
    console.log("failed",error);
});


app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running'
    })
})

module.exports=app;