import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: [true, "firstname is required"],
    },
    lastname:{
        type:String,
        required: [true, "lastname is required"]
    },
    email:{
        type:String,
        required: [true, "email is requied"],
        unique: [true, "email already exist!"],
    },
    mobile:{
        type:String,
        required: [true, "phone number is required"],
        unique: [true, "phone number already exist!"],
    },
    password:{
        type:String,
        required: [true, "password is required"],
    },
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    next()
})
userSchema.methods.isPasswordMatched = async function (enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}

//Export the model
const User = mongoose.model("User", userSchema)

export default User 