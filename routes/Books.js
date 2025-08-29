const express = require ("express");
const books = require("../models/books");
const booksRouter = express.Router ()

// Add a book
booksRouter.post("/add", async(req , res)=>{
    try {
        let newbook = new books(req.body);
        let result = await newbook.save();
        res.send ({book:result, msg :"The book is added"})
    } catch (error) {
        console.log(error)
        
    }
})

// Get All books
booksRouter.get("/", async(req , res)=>{
    try {
        let result = await books.find();
        res.send ({books:result, msg :"All books"})
    } catch (error) {
        console.log(error)
        
    }
})

// Get one book
booksRouter.get("/:id", async(req , res)=>{
    try {
        let result = await books.findById(req.params.id);
        res.send ({book:result, msg :"One book"})
    } catch (error) {
        console.log(error)
        
    }
})

// Delete book
booksRouter.delete("/:id", async(req , res)=>{
    try {
        let result = await books.findByIdAndDelete(req.params.id);
        res.send ({msg :"The book is deleted"})
    } catch (error) {
        console.log(error)
        
    }
})

// Update book
booksRouter.put("/:id", async(req , res)=>{
    try {
        let result = await books.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:{...req.body}}
        );
        res.send ({msg :"The book is updated"})
    } catch (error) {
        console.log(error)
        
    }
})


module.exports = booksRouter