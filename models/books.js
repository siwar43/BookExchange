const mongoose = require ("mongoose");
const schema = mongoose.Schema

const BookSchema = new schema ({
    title : String , 
    Owner : String,
    author : String , 
    editor : String , 
    description : String , 
    category : String , 
    price : Number , 
    image : String , 
    language : String , 
    rate : Number,


});

module.exports = mongoose.model("book", BookSchema);