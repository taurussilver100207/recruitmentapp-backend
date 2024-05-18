import mongoose from "mongoose";
import Test from "./Test.js"
const QuestionSchema = new mongoose.Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
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
    correctOption: {
        type: String,
        enum: this.options,
        message: '{VALUE} is not supported',
        required: true
    },
    score: {
        type: Number,
        required: true,
        validate: {
            validator: async v => {
                const test = await Test.findById(this.test)

                if (!test) return false

                return v < test.totalScore
            }
        }
    },
}, { timestamps: true })

const Question = mongoose.model("Question", QuestionSchema)

export default Question