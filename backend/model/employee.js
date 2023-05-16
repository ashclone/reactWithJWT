const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    salary:{
        type:Number,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

const employeeModel = mongoose.model("employee",employeeSchema);
module.exports= employeeModel;