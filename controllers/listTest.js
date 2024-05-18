import express from 'express'
import bodyParser from 'body-parser';
import listTestModel from '../models/ListTest.js'

const app = express();

app.use(bodyParser.json());

// see list of test
export const checkList = async (req, res) => {
    try {
        const lists = await listTestModel.find()
        if (lists) {
            res.json(lists)
        } else {
            res.status(404).send({ message: "List position is not defound!" })
        }
        res.status(200).send(lists)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// create a new test
export const newCreate = async (req, res) => {
    try {
        const create = new listTestModel(req.body)

        await create.save()
        // const newCreate = new listModel({
        //     maBaiTest,
        //     tenBaiTest,
        //     thoiLuong,
        //     moTa,
        //     chucVu,
        //     cauHoi,
        //     diemSoToiThieu
        // });


        // listProduct.push(newCreate);

        res.status(201).json(create)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// update test
export const update = async (req, res) => {
    try {
        const updates = await listTestModel.findByIdAndUpdate(req.params.id)
        await updates.save()

        res.status(202).send(updates)

    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// delete test
export const deleteTest = async (req, res) => {
    try {
        const updates = await listTestModel.findByIdAndDelete(req.params.id)
        if (!updates) {
            res.status(404).json({ Message: "list cannot be default" })
        }
        res.status(500).send("list has been removed")
    } catch (error) {

    }
}


