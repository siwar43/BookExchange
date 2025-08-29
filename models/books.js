const mongoose = require ("mongoose");
const schema = mongoose.Schema

const BookSchema = new schema ({
    title : String , 
    author : String , 
    editor : String , 
    description : String , 
    category : String , 
    price : Number , 
    pages : Number , 
    image : String , 
    language : String , 

});

module.exports = mongoose.model("book", BookSchema);