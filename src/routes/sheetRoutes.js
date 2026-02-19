import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createSheet, deleteSheet, getAllSheets, getSheet } from '../controllers/sheetController.js';
const sheetRouter = express.Router();


// create a new sheet
sheetRouter.post('', createSheet);

sheetRouter.get('', getAllSheets);

// get sheet's infos
sheetRouter.get('/:name', getSheet);

// update sheet
sheetRouter.put('/:name', (req, res) => {
    let name = req.params.name;
    res.send(`updating ${name} sheet`);
})

// delete sheet
sheetRouter.delete('/:name', deleteSheet)

export default sheetRouter;