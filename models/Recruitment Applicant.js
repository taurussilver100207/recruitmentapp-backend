import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId
const RecruimentApplicantSchema = new Schema({
    recruimentId : mongoose.Schema.Types.ObjectId,
    hovaten: String,
    giotinh: String,
    namsinh: Number,
    email: String,
    sodienthoai: String,
    diemlambaitestdauvao: Number,
    ngayphongvan: String,
    ketqua: String,
    ngaynhanviec: Date
})

const RecruimentApplicant = mongoose.model("recruimentApplicant", RecruimentApplicantSchema)

export default RecruimentApplicant;