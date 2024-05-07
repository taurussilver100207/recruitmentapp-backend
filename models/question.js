import mongoose from "mongoose";
import { validate } from "uuid";

const QuestionSchema = new mongoose.Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        validate: {
            validator: async v => {
                const checkTestExistence = await mongoose.model("Test").exists({ _id: v })
                return checkTestExistence
            },
            message: "The test does not exist."
        }
    },
    question: {
        type: String,
        required: true,
        max: [300, "The maximum length for a question is 300 characters."]
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: v => {
                return v.length == 4
            },
            message: "The number of options must be 4."
        } 
    },
    score: {
        type: Number,
        required: true,
        validate: {
            validator: async v => {
                const test = await mongoose.model("Test").findOne({ _id: this.test })

                if (!test) return false

                return v < test.totalScore
            }
        }
    },
}, { timestamps: true })

const Question = mongoose.model("Question", QuestionSchema)

export default Question