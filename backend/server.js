require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./model/user");
const multer = require("multer");
const jwt = require ("jsonwebtoken");
const employeeModel = require("./model/employee");



const app = express();
app.use(express.json());
app.use(cors());

//storage
const Storage = multer.diskStorage({
    destination:"uploads",filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
})

const upload = multer({
    storage:Storage
}).single('testImage')

//Register
app.post("/register",async(req,res)=>{
    await userModel.findOne({username:req.body.username}).then(async(d)=>{
        if(d){
            res.json({status:-1,message:"user successfully !!"});
        }
        else{
            await userModel.create(req.body).then((d)=>{
                if(d){
                res.json({status:1,message:"user successfully registerd!!"});
            }
            }).catch((e)=>{
                res.json({status:0,message:e});
            });

        }
    });

});

//Login
app.post("/login",async(req,res)=>{
    await userModel.findOne(req.body).then((d)=>{
        if(d){
               //JWt
               let data={userId:d._id};
               const token = jwt.sign(data,process.env.JWT_KEY);
            res.json({status:1,message:"User Login",data:token});
        }
        else{
            res.json({status:-1,message:"Wrong User/Pwd"});
        }
    }).catch((e)=>{
        res.json({status:0,message:e});
    });
});
//employees
app.post("/saveEmployee",(req,res)=>{

    employeeModel.create(req.body).then((d)=>{
        if(d){
            res.json({status:1,message:"data saved"});
        }
        else{
            res.json({status:-1,message:"data not saved"});
        }
    }).catch((e)=>{
        res.json({status:0,message:e});
    });
});

app.get("/getEmployees",async(req,res)=>{
    var authHeader = req.headers.authorization;
    if(authHeader!=null)
    {
        await employeeModel.find().then((d)=>{
            if(d){
            res.json({status:1,empData:d});
        }
        else{
            res.json({status:-1,message:"no data found"});
        }
        }).catch((e)=>{
            res.json({status:0,empData:e});
        });
    }
    else{
        res.json({status:-2,message:"You Are Not authoRize!!"});
    }
   
});

app.put("/updateEmployee",(req,res)=>{
    var authHeader = req.headers.authorization;
    if(authHeader!=null)
    {
        employeeModel.updateOne({_id:req.body._id},{$set:req.body}).then((d)=>{
            if(d){
                res.json({status:1,message:"data updated"});
            }
            else{
                res.json({status:-1,message:"data not update"});
            }
        }).catch((e)=>{
            res.json({status:0,message:e});
        });
    }
    else{
        res.json({status:-2,message:"You Are Not authoRize!!"});
    }

   
});

app.delete("/deleteEmployee",(req,res)=>{
    employeeModel.deleteOne({_id:req.body._id}).then((d)=>{
        if(d){
            res.json({status:1,message:"data deleted"});
        }
        else{
            res.json({status:-1,message:"data not deleted"});
        }
    }).catch((e)=>{
        res.json({status:0,message:e});
    });
});

//upload
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const userImage = new userModel({
                image:{
                    data:req.file.filename,
                    contentType:'image/jpg'
                },
            });
            userImage.save().then(()=>res.send("sucessfully uploaded")).catch(err=>console.log(err));
        }
    })
})






mongoose.connect(process.env.DB_URL).then((db)=>{
    console.log("database connected");
    app.listen(process.env.PORT,()=>{
        console.log("server is running at port: "+process.env.PORT);
    });
})
.catch((e)=>{
    console.log("error connecting database");
});
