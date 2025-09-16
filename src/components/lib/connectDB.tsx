import mongoose from "mongoose";


export function connectDB(){
    try{

        mongoose.connect("mongodb://localhost:27017/KarimPrepArina").then((connection)=>{
    
            console.log(connection);
            console.log("db connect successful")
        })
    }catch{
        console.log("error db not connected")
    }
}``