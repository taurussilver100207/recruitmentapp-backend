import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RecruimentApplicantSchema = new Schema({
    recruimentId: mongoose.Schema.Types.ObjectId,
    name: String,
    gender: String,
    yearofbirth: Number,
    email: String,
    phone: String,
    enstrancetestscore: Number,
    interviewdate: String,
    result: String,
    jobdate: Date
})

const RecruimentApplicant = mongoose.model("recruimentApplicant", RecruimentApplicantSchema)

export default RecruimentApplicant;