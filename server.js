console.clear();
const express = require ("express"); 
const cors = require ("cors");
const connectDB = require("./config/dbConnect");
const app = express();
require("dotenv").config();

// Connect to DB 
connectDB();

// Routes
app.use (express.json());
app.use(cors());
app.use ("/user" , require("./routes/Authentification"));

// Server
const PORT = process.env.PORT;
app.listen(PORT,(error)=> 
    error ? console.log(error) : console.log("Server is running")
);