import express from 'express';
import { createSheet, deleteSheet, getAllSheets, getSheet, updateSheet } from '../controllers/sheetController.js';
const sheetRouter = express.Router();


// create a new sheet
sheetRouter.post('/', createSheet);

sheetRouter.get('/', getAllSheets);

// get sheet's infos
sheetRouter.get('/:name', getSheet);

// update sheet
sheetRouter.put('/:name', updateSheet)

// delete sheet
sheetRouter.delete('/:name', deleteSheet)

export default sheetRouter;