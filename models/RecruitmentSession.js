import mongoose from "mongoose";

const RecruitmentSessionSchema = new mongoose.Schema({
    officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        max: [50, "The recruitment session cannot exceed 50 characters."],
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    jobPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    descriptions: {
        type: Array,
        default: [],
        required: true
    },
})

const RecruitmentSession = mongoose.model("RecruitmentSession", RecruitmentSessionSchema)

export default RecruitmentSession;