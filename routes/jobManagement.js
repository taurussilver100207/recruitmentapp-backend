import express from 'express';
import { createJob, deleteJob, getListJobs, getJob, updateJob, filterJobs } from '../controllers/jobManagement.js';
import { checkRole } from '../middleware/authorization.js';
import { verifyToken } from '../middleware/auth.js';

const jobRouter = express.Router();

jobRouter.post('/createJob'/*,verifyToken(),/* checkRole(["officer"]),*/, createJob);
jobRouter.delete('/deleteJob/:idJob'/*,verifyToken(),/* checkRole(["officer"]),*/, deleteJob);
jobRouter.get('/listJobs', getListJobs);
jobRouter.get('/getJob/:id', getJob);
jobRouter.put('/updateJob/:id'/*,verifyToken(),/* checkRole(["officer"]),*/, updateJob);
jobRouter.get('/search', filterJobs);

export default jobRouter;