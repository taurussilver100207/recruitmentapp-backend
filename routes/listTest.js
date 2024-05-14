import express  from 'express'
import { checkList, deleteTest, newCreate, update } from '../controllers/listTest.js'
import { candidateRecruiment, candidates, checkRecruitment, createCandidate, createRecruiment, deleteCandidate, detailRecruiment, interviewCandidate, updateCandidateList, updateRecruiment, updateStatusRecruiment } from '../controllers/listCompany.js'

const routerList = express.Router()

// Quản lý bài test đầu vào
routerList.get("/checkList", checkList)
routerList.post("/createList", newCreate)
routerList.put("/updateList/:id", update)
routerList.delete("/deleteList/:id", deleteTest)

// đợt tuyển dụng của công ty (recruiment)
routerList.get("/checkRecruiment", checkRecruitment)
routerList.get("/detailRecruiment/:id", detailRecruiment)
routerList.post("/createRecruiment", createRecruiment)
routerList.put("/updateRecruiment/:id", updateRecruiment)

// ứng viên (candidate)
routerList.get("/candidateRecruiment", candidateRecruiment)
routerList.post("/createCandidate", createCandidate)
routerList.put("/updateCandidate/:id", updateStatusRecruiment)
routerList.delete("/deleteCandidate/:id", deleteCandidate)
routerList.put("/updateCandidate/:recruimentId/candidate/:id", updateCandidateList)
routerList.put("/updateCandidate/:id/phongvan", candidates)
routerList.put("/updateCandidate/:id/ketqua", interviewCandidate)



export default routerList;