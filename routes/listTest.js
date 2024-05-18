import express from 'express'
import { checkList, deleteTest, newCreate, update } from '../controllers/listTest.js'
import { candidateRecruiment, candidates, checkRecruitment, createCandidate, createRecruiment, deleteCandidate, detailRecruiment, interviewCandidate, updateCandidateList, updateRecruiment, updateStatusRecruiment } from '../controllers/listCompany.js'

const listTest = express.Router()

// Quản lý bài test đầu vào
listTest.get("/checkList", checkList)
listTest.post("/createList", newCreate)
listTest.put("/updateList/:id", update)
listTest.delete("/deleteList/:id", deleteTest)

// đợt tuyển dụng của công ty (recruiment)
listTest.get("/checkRecruiment", checkRecruitment)
listTest.get("/detailRecruiment/:id", detailRecruiment)
listTest.post("/createRecruiment", createRecruiment)
listTest.put("/updateRecruiment/:id", updateRecruiment)

// ứng viên (candidate)
listTest.get("/candidateRecruiment", candidateRecruiment)
listTest.post("/createCandidate", createCandidate)
listTest.put("/updateCandidate/:id", updateStatusRecruiment)
listTest.delete("/deleteCandidate/:id", deleteCandidate)
listTest.put("/updateCandidate/:recruimentId/candidate/:id", updateCandidateList)
listTest.put("/updateCandidate/:id/phongvan", candidates)
listTest.put("/updateCandidate/:id/ketqua", interviewCandidate)



export default listTest;