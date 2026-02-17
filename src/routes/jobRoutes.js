import express from 'express';
const jobRouter = express.Router();


// create a new job
jobRouter.post('/:name', (req, res) => {
    let name = req.params.name;
    res.send(`creating a new job on sheet ${name}`)
})

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