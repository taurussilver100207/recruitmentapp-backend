import express from 'express';
import bodyParser from 'body-parser';
import candidatesModel from '../models/Candidates.js';

const app = express()

app.use(bodyParser.json());

// xem danh sách tất cả các ứng viên từ các đợt phỏng vấn 
export const listCandidateStatus = async (status) => {
    try {
        const appliCandidates = await candidatesModel.find({ status });
        return appliCandidates;
    } catch (error) {
        console.log("error :>>", error);
    }
}

export const listAllCandidate = async () => {
    try {
        const listAll = await candidatesModel.find();
        return listAll;
    } catch (error) {
        console.log("error :>>", error);
    }
}
