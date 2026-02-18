import express from 'express';
const sheetRouter = express.Router();


// create a new sheet
sheetRouter.post('/', (req, res) => {
    res.send('creating a new sheet');
})

// get sheet's infos
sheetRouter.get('/:name', (req, res) => {
    let name = req.params.name;
    res.send(`getting ${name} sheet`);
})

// update sheet
sheetRouter.put('/:name', (req, res) => {
    let name = req.params.name;
    res.send(`updating ${name} sheet`);
})

// delete sheet
sheetRouter.delete('/:name', (req, res) => {
    let name = req.params.name;
    res.send(`deleting ${name} sheet`);
})

export default sheetRouter;