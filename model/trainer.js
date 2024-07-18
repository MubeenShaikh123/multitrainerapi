var mongoose=require('mongoose');

var trainerSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    class_name:String,
    trainer_name:String,
    rating:String,
    rating_count:String,
    address:String,
    mobile_number:Number,
    profil_share:String
});

module.exports=mongoose.model('Trainer',trainerSchema)

