const mongoose = require ("mongoose");
const schema = mongoose.Schema

const OrderSchema = new schema ({
    booktitle : String , 
    bookimage : String , 
    username : String , 
    price : Number ,
    dateorder : String , 
    status : String , 
});

module.exports = mongoose.model("order", OrderSchema);