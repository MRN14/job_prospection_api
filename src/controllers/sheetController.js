import { where } from "sequelize";
import Sheet from "../models/sheet.js";

export const createSheet = async (req, res) => {
    // Check for user
    let user = req.user;
    if (!user) {
        return res.status(400).json({ "message": "no user found" });
    }

    // Check for name
    let name = req.body.name;
    if (!name) {
        return res.status(400).json({ "message": "missing name in body's request" });
    }

    // Check if sheet already exists
    const sheet = await Sheet.findOne({ where: { name } });
    if (sheet) {
        return res.status(400).json({ "message": "sheet already exists" });
    }

    // Creat sheet
    await Sheet.create({ name, userId: user.id });
    res.status(201).json({ "message": "sheet created" });
}

export const getAllSheets = async (req, res) => {
    let user = req.user;

    // Get all user's sheets
    let sheets = await Sheet.findAll({ where: { userId: user.id } });
    res.status(200).json({ sheets });
}

export const getSheet = async (req, res) => {
    let name = req.params.name;
    let user = req.user;

    if (!name) {
        res.status(400).json({ "message": "missing name, wtf should not happen" });
    }

    let sheet = await Sheet.findOne({ where: { name: name, userId: user.id } });

    if (!sheet) {
        res.status(204).json({ "message": "sheet not found" });
    }

    res.status(200).json({ sheet });
}