import mongoose from "mongoose";

const userData = new mongoose.Schema({
    recordId:{required:true,type :String,unique : true},

    usertododata:[
        {
            text :String 
        }
    ]
    
})
const User = mongoose.model("User",userData)
export default User