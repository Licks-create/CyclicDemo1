const mongoose = require('mongoose');
const address=new mongoose.Schema({
    state:String,
    city:String
})
const formSchema=new mongoose.Schema({
    StName:String,
    StAge:Number,
    StGender:String,
    StCity:String,
    address:address
})
module.exports=mongoose.model('users',formSchema)