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

// export const candides = await listCandidateStatus('Đang ứng tuyển')
// export const candidates = await listCandidateStatus('Đã lưu hồ sơ lại')
// export const candidate = await listCandidateStatus('Xác nhận vị trí')
// export const candidateStatus = await listCandidateStatus('Từ chối vị trí') 