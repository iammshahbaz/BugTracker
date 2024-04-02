const mongoose = require("mongoose")

const bugSchema = mongoose.Schema({
    title: { type: String, required: true },
    description:{type:String},
    source:{type:String},
    severity:{type:String , enum:['Critical', 'Major', 'Medium', 'Low']},
    raised_by:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    
},{
    versionKey :false
})

const BugModel = mongoose.model("bug",bugSchema)

module.exports={
    BugModel
}