import express from 'express'
import bodyParser from 'body-parser';
import listTest from '../models/ListTest.js';

const app = express();
// const port = process.env.PORT || 8000

app.use(bodyParser.json());

export const checkList = async (req, res) => {
    try {
        // const listId = parseInt(req.params.id);
        const lists = await listTest.find()
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

// tạo mới bài test 
export const newCreate = async (req, res) => {
    try {
        const create = new listTest(req.body)

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

// cập nhật bài test
export const update = async (req, res) => {
    try {
        const updates = await listTest.findByIdAndUpdate(req.params.id)
        await updates.save()

        res.status(202).send(updates)

    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
}

// xóa bài test
export const deleteTest = async (req, res) => {
    try {
        const updates = await listTest.findByIdAndDelete(req.params.id)
        if (!updates) {
            res.status(404).json({ Message: "list cannot be default" })
        }
        res.status(500).send("list has been removed")
    } catch (error) {

    }
}

