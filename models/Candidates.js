import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const candidateSchema = new Schema({
    name: String,
    gender: String,
    yearofbirth: Number,
    email: String,
    phone: String,
    status: {
        type: String,
        enum: [
            "Đang ứng tuyển",
            "Đã lưu hồ sơ lại",
            "Xác nhận vị trí",
            "Từ chối vị trí"
        ],
        default: "Đang ứng tuyển"
    }
})

const candidatesModel = mongoose.model("candidates", candidateSchema)

export default candidatesModel;