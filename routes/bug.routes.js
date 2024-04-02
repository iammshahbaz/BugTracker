const express = require("express")

const bugRouter = express.Router()


bugRouter.post("/",async(req,res)=>{
    const{title,description,source,severity,raised_by} = req.body
    try {
        const bug = new BugModel({
            title:title,
            description:description,
            severity:severity,
            raised_by:raised_by
        })
        await bug.save();
        res.status(200).send({"msg":"bug created successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})

//get all bugs
bugRouter.get("/",async(req,res)=>{
    try {
        const bugs = await BugModel.find(req.query);
        res.status(200).send("all the available bugs are:",bugs)
    } catch (error) {
        res.send({"error":error})
    }
})

//get bug by id
bugRouter.get("/:bugId",async(req,res)=>{
    const {bugId} = req.params

    try {
        const bug = await BugModel.findOne({_id:bugId})
        // console.log(book)
        if (!bug) {
            return res.status(404).json({ msg: `Bug with ID ${bugId} not found` });
        }
        res.status(200).json({ msg: `The bug with ID ${bugId}`, bug });

    } catch (error) {
        res.status(400).send({"error":error})
    }
})

//patch

bugRouter.patch("/:bugId",async(req,res)=>{
    const{bugId} = req.params
    const payload = req.body
    try {
        await BugModel.findByIdAndUpdate({_id:bugId},payload)
        res.status(204).send({"msg":`the bug with Id:${bugId} has been updated`})
        
    } catch (error) {
        res.send({"error":error})
        
    }
})

//delete

bugRouter.delete("/:bugId",async(req,res)=>{
    const{bugId} = req.params
    const payload = req.body
    try {
        await BugModel.findByIdAndDelete({_id:bugId},payload)
        res.status(204).send({"msg":`the bug with Id:${bugId} has been deleted`})
        
    } catch (error) {
        res.send({"error":error})
        
    }
})




module.exports={
    bugRouter
}