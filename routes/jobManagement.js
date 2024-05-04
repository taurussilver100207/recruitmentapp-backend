import express from 'express';
import { createJob, deleteJob, getListJobs, getJob, updateJob, filterJobs } from '../controllers/jobManagement.js';

const jobRouter = express.Router();

jobRouter.post('/createJob', createJob);
jobRouter.delete('/deleteJob/:idJob', deleteJob);
jobRouter.get('/listJobs', getListJobs);
jobRouter.get('/getJob/:idJob', getJob);
jobRouter.put('/updateJob/:id', updateJob);
jobRouter.get('/search',filterJobs)

export default jobRouter;