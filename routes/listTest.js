import express from 'express'
import { checkList, deleteTest, newCreate, update } from '../controllers/listTest.js'

const routerList = express.Router()

routerList.get("/checkList" , checkList)
routerList.post("/createList" , newCreate )
routerList.put("/updateList/:id" , update )
routerList.delete("/deleteList/:id" , deleteTest )

export default routerList;