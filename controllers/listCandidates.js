import express from 'express';
import bodyParser from 'body-parser';
import candidatesModel from '../models/Candidates.js';

const app = express()

app.use(bodyParser.json());

// xem danh sách tất cả các ứng viên từ các đợt phỏng vấn 
export const listCandidateNotification = async (req, res) => {
    try {
        const appliCandidates = await candidatesModel.find();
        // await appliCandidates.save();

        res.status(200).send(appliCandidates)
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).send(error)
    }
} 