const express = require ("express");
const order = require("../models/order");
const ordersRouter = express.Router ()

// Add a command
ordersRouter.post("/add", async(req , res)=>{
    try {
        let neworder = new order(req.body);
        let result = await neworder.save();
        res.send ({order:result, msg :"The order is added"})
    } catch (error) {
        console.log(error)
        
    }
})

// Get All orders
ordersRouter.get("/", async(req , res)=>{
    try {
        let result = await order.find();
        res.send ({orders:result, msg :"All orders"})
    } catch (error) {
        console.log(error)
        
    }
})

// Get one order
ordersRouter.get("/:id", async(req , res)=>{
    try {
        let result = await order.findById(req.params.id);
        res.send ({order:result, msg :"One order"})
    } catch (error) {
        console.log(error)
        
    }
})

// Delete order
ordersRouter.delete("/:id", async(req , res)=>{
    try {
        let result = await order.findByIdAndDelete(req.params.id);
        res.send ({msg :"The order is deleted"})
    } catch (error) {
        console.log(error)
        
    }
})

// Update order
ordersRouter.put("/:id", async(req , res)=>{
    try {
        let result = await order.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:{...req.body}}
        );
        res.send ({msg :"The order is updated"})
    } catch (error) {
        console.log(error)
        
    }
})


module.exports = ordersRouter