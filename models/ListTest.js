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

    cauhoi: [
        {
            cauhoi: [{ type: String, require: true }],
            cautraloi: [{ type: String, require: true }]
        }
    ],
    totalScore: {
        type : Number,
        require: true,
    }
})

const listTest = mongoose.model("Test", listTestSchema)

export default listTest;