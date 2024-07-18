var mongoose=require('mongoose');

var testemonialSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    Testimonial :String,
    Testimonial_Autor_Name:String    
});

module.exports=new mongoose.model('Testimonial',testemonialSchema)
