var mongoose=require('mongoose');

var aboutSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
   about_us:String,
   our_services:String
});

module.exports=mongoose.model('About',aboutSchema);