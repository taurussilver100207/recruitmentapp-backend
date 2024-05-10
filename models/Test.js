import mongoose from "mongoose";

const generateRandomCode = () => {
    return Math.floor(100000  + Math.random() * 900000).toString()
}

const TestSchema = new mongoose.Schema({
    testCode: {
        type: String,
        default: generateRandomCode,
        unique: true
    },

    testName: {
        type: String,
        require: true,
    },

    time: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true,
        max: [250, "The character maximum is 250"]
    },
    appliedJobPositions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
     }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    }],
    totalScore: {
        type : Number,
        require: true,
    }
})

const Test = mongoose.model("Test", TestSchema)

export default Test;