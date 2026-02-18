import { where } from "sequelize";
import Sheet from "../models/sheet.js";

export const createSheet = async (req, res) => {
    // Check for user
    let user = req.user;
    if (!user) {
        return res.status(400).json({ message: "no user fond" });
    }

    // Check for name
    let name = req.body.name;
    if (!name) {
        return res.status(400).json({ message: "missing name in body's request" });
    }

    // Check if sheet already exists
    const sheet = await Sheet.findOne({ where: { name } });
    if (sheet) {
        return res.status(400).json({ message: "sheet already exists" });
    }

    // Creat sheet
    await Sheet.create({ name, userId: user.id });
    res.status(201).json({ message: "sheet created" });
}

export const getAllSheets = async (req, res) => {
    // Check for user
    let user = req.user;
    if (!user) {
        return res.status(400).json({ message: "access error" });
    }

    let sheets = await Sheet.findAll({ where: { userId: user.id } });

    res.status(200).json({ sheets });
}