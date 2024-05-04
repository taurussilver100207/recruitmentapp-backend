import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listTestSchema = new Schema({
    maBaiTest: String,

    tenBaiTest: {
        type: String,
        require: true,
    },

    thoiLuong: Number,

    moTa: String,

    chucVu: ObjectId,

    diemSoToiThieu: {
        require : true,
    }
})

const listTest = mongoose.model("list", listTestSchema)

export default listTest;