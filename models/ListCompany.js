import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const listTestSchema = new Schema({
    tên : String,
    ngaybatdau : String,
    ngayketthuc : String,
    
})

const listTest = mongoose.model("companyList", listTestSchema)

export default listTest;