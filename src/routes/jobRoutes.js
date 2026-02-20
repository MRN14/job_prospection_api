import express from 'express';
import { createJob } from '../controllers/jobController.js';
import { verifyJobDatas } from '../middlewares/jobDatasValidation.js';
const jobRouter = express.Router();


// create a new job
jobRouter.post('/:name', verifyJobDatas, createJob)

// get sheet's infos
jobRouter.get('/:name/:id', (req, res) => {
    let name = req.params.name;
    let id = req.params.id;
    res.send(`getting ${id}'s job on ${name} sheet`)
})

// update sheet
jobRouter.put('/:name/:id', (req, res) => {
    let name = req.params.name;
    let id = req.params.id;
    res.send(`updating ${id}'s job on ${name} sheet`)
})

// delete sheet
jobRouter.delete('/:name/:id', (req, res) => {
    let name = req.params.name;
    let id = req.params.id;
    res.send(`deleting ${id}'s job on ${name} sheet`)
})

export default jobRouter;