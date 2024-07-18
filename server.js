
var express=require('express');
var app=express();

var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());


var trainerRoute=require('./app/route/trainer')
app.use('/trainer',trainerRoute)

var educationRoute=require('./app/route/education');
app.use('/education',educationRoute);

var productRoute=require('./app/route/product');
app.use("/product",productRoute);

var testemonialRoute=require('./app/route/testmonial')
app.use("/testmonial",testemonialRoute);

var eventSchema=require('./app/route/event');
app.use("/event",eventSchema);

var socialMediaSchema=require('./app/route/social_media');
app.use("/socialMedia",socialMediaSchema);

var userRout=require('./app/route/user');
app.use("/user",userRout);

var batchRoute=require('./app/route/batch');
app.use("/batch",batchRoute);

var aboutRoute=require('./app/route/about');
app.use("/about",aboutRoute);

var gallaryRoute=require('./app/route/gallary');
app.use('/gallary',gallaryRoute);

var mongoose= require('mongoose');
mongoose.connect('mongodb+srv://admin123:admin%40123@cluster0.hoe2jrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(function(){
    console.log("connection successful");
})
.catch(function(){
    console.log("failed");
});


app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running'
    })
})

module.exports=app;