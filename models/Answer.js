import mongoose from "mongoose";
import Question from "./Question.js";

const AnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question",
    },
    answer: {
        type: String,
        validate: {
            validator: async v => {
                const checkIncludedAnswer = await Question.findById(this.question).include(v)
                return checkIncludedAnswer
            },
            message: "The answer is not included in the options."
        }
    },
    isTrue: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

const Answer = mongoose.model("Answer", AnswerSchema)
export default Answer