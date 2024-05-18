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
    diemSoToiThieu: {
        type : Number,
        require: true,
    }
})

const listTestModel = mongoose.model("list", listTestSchema)

export default listTestModel;