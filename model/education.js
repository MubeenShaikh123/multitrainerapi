var mongoose=require('mongoose');

var educationSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    school:String,
    college:String,
    degree:String,
    other_details:String,
    achievements:String
});

module.exports=mongoose.model('Education',educationSchema);