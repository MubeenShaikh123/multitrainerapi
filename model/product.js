var mongoose=require('mongoose');

var productSchema= new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    Products_info:String,
    Product_name:String,
    Product_Prize:Number
});

module.exports= mongoose.model('Product',productSchema);