import mongoose from "mongoose";
const MONGO_URL="mongodb://localhost:27017/ems"
const connectionToDb = async()=>{
    try{
      await mongoose.connect(MONGO_URL);
      console.log("Connected to Database");
    }catch(error){
        console.log(error);
    }
}

export default connectionToDb;