var mongoose=require('mongoose');

var userSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    users_name:String,
    rating_in_star:String,
    reviews :String,
    Date :String,
    image:String
});

module.exports=mongoose.model('User',userSchema);