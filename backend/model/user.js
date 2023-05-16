const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        require:true,
        type:String,
    },
    image:{
        data:Buffer,
        contentType: String,

    },
});

const userModel = mongoose.model("user",userSchema);
module.exports=userModel;