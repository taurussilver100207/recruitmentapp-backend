import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    phoneNumber: {
        type: String,
        required: true
    },
    // entranceScore: {
    //     type: Number,
    //     required: true
    // },
    // interviewDate: {
    //     type: Date,
    //     required: true
    // },
    // interviewResult: {
    //     type: String,
    //     required: true
    // },
    // workDay: {
    //     type: Date,
    //     required: true
    // },
    role: {
        type: String,
        enum: ["candidate", "officer"],
        default: "candidate"
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)



export default User;