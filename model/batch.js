var mongoose=require('mongoose');

var batchSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    Batch_categories:String,
    batch_name:String,
    trainer_name :String,
    progress :String,
    batch_image:String
});

module.exports=mongoose.model('Batch',batchSchema);