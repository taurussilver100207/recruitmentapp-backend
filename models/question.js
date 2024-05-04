import mongoose from "mongoose";

const Schema = mongoose.Schema

const question = new Schema({
    made: String,
    cauhoi: String,
    diem: Number,
    dapan: Array,
    dapandung: String,
    loaicauhoi: String,
})

const questionModel = mongoose.model("question", question)

export default questionModel;