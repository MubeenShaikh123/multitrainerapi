var mongoose=require('mongoose');

var eventSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    event_name:String,
    event_type:String,
    event_categories:String,
    event_start_time:String,
    event_End_time:String
});

module.exports=mongoose.model('Event',eventSchema);