import mongoose from "mongoose";

const dbconnect = async ()=>{
    await mongoose.connect(process.env.mongo_url).then(()=>{
        console.log("database connected")
    }).catch((error)=>{
        console.log(object)
    })
}

export default dbconnect;