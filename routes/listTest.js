import express from 'express'
import { checkList, deleteTest, newCreate, update } from '../controllers/listTest.js'
import { checkCecruitment, createCandidate, createRecruiment, deleteCandidate, detailRecruiment, updateRecruiment, updateStatusRecruiment } from '../controllers/listCompany.js'

const routerList = express.Router()

routerList.get("/checkList", checkList)
routerList.post("/createList", newCreate)
routerList.put("/updateList/:id", update)
routerList.delete("/deleteList/:id", deleteTest)

// đợt tuyển dụng của công ty (recruiment)
routerList.get("/recruiment", checkCecruitment )
routerList.get("/recruiment/:id" , detailRecruiment)
routerList.post("/createRecruiment", createRecruiment)
routerList.put("/updateRecruiment/:id", updateRecruiment)

// ứng viên (candidate)
routerList.post("/createCandidate/:id", createCandidate)
routerList.put("/updateCandidate/:id", updateStatusRecruiment)
routerList.delete("/deleteCandidate/:id", deleteCandidate)


export default routerList;