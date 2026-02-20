import express from 'express';
import { createJob, getJob, updateJob } from '../controllers/jobController.js';
import { verifyJobDatas } from '../middlewares/jobDatasValidation.js';
const jobRouter = express.Router();


// create a new job
jobRouter.post('/:name', verifyJobDatas, createJob)

// get sheet's infos
jobRouter.get('/:name/:id', getJob);

// update sheet
jobRouter.put('/:name/:id', updateJob);

// delete sheet
jobRouter.delete('/:name/:id', (req, res) => {
    let name = req.params.name;
    let id = req.params.id;
    res.send(`deleting ${id}'s job on ${name} sheet`)
})

export default jobRouter;