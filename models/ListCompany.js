import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RecruitSessionSchema = new Schema({
    tên: String,
    ngaybatdau: Date,
    ngayketthuc: Date,
    vitri: Array,
    soluong: Number,
    mota: String,
})

const RecruitSession = mongoose.model("recruitSession", RecruitSessionSchema)

export default RecruitSession;