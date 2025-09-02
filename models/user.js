const mongoose = require ("mongoose");
const schema = mongoose.Schema

const UserSchema = new schema ({
    username : {
        type : String , 
        required : true ,
    },
    email : {
        type : String , 
        required : true ,
    },
    password : {
        type : String , 
        required : true ,
    },
    image : String , 
    address : String , 
    phone : String ,
    country : String , 
    city : String , 
    title : String ,
    languages : String , 
    age : String , 
    description : String , 
});

module.exports = mongoose.model("user", UserSchema);

