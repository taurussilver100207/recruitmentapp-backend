import express from "express"
import { listCandidateStatus, listAllCandidate } from '../controllers/listCandidates.js';

const routerCandidate = express.Router();

// xem danh sách ứng viên từ các đợt phỏng vấn  
routerCandidate.get("/candidate/:status", listCandidateStatus)
routerCandidate.get("/candidatesAll", listAllCandidate)

export default routerCandidate;