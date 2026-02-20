import express from 'express';
import { createJob, deleteJob, getJob, updateJob } from '../controllers/jobController.js';
import { verifyJobDatas } from '../middlewares/jobDatasValidation.js';
const jobRouter = express.Router();


// create a new job
jobRouter.post('/:name', verifyJobDatas, createJob)

// get sheet's infos
jobRouter.get('/:name/:id', getJob);

// update sheet
jobRouter.put('/:name/:id', updateJob);

// delete sheet
jobRouter.delete('/:name/:id', deleteJob)

export default jobRouter;