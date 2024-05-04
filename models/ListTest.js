import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const listTestSchema = new Schema({
    maBaiTest: String,

    tenBaiTest: {
        type: String,
        require: true,
    },

    thoiLuong: String,

    moTa: String,

    chucVu: String,

    diemSoToiThieu: {
        type: Number,
    }
})

const listTest = mongoose.model("list", listTestSchema)

export default listTest;