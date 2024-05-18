import mongoose from "mongoose";
import Test from "./Test.js";
import User from "./User.js"

const CVSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        validate: {
            validator: async v => {
                return Test.exists({ _id: v })
            }
        }
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    }],
    score: {
        type: Number,
        default: 0,
        required: true,
        validate: {
            validator: async v => {
                return v < await Test.findById(this.test).totalScore
            },
            message: "The score exceeds the default total score."
        }
    },
    interviewDate: Date,
    result: String,
    jobAcceptanceDate: Date
}, { timestamps: true })

const CV = mongoose.model("CV", CVSchema)

export default CV