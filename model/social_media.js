var mongoose=require('mongoose');

var socialMediaSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
        Email_Id:String,
        facebook:String,
        instagram:String,
        youtube:String,
        Linkdein:String,
});

module.exports=mongoose.model('SocialMedia',socialMediaSchema);

