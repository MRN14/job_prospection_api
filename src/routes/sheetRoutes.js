import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createSheet, getAllSheets } from '../controllers/sheetController.js';
const sheetRouter = express.Router();


// create a new sheet
sheetRouter.post('', verifyToken, createSheet);

sheetRouter.get('', verifyToken, getAllSheets);

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