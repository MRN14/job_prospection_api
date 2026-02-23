import { Job, Sheet } from "../models/modelSync.js";

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
    const sheet = await Sheet.findOne({ where: { name, userId: user.id } });
    if (sheet) {
        return res.status(400).json({ "message": "sheet already exists" });
    }

    // Creat sheet
    await Sheet.create({ name, userId: user.id });
    return res.status(201).json({ "message": "sheet created" });
}

export const getAllSheets = async (req, res) => {
    let user = req.user;

    // Get user's sheets
    let sheets = await Sheet.findAll({ where: { userId: user.id }, attributes: { exclude: ["userId"] } });
    return res.status(200).json({ sheets });
}

export const getSheet = async (req, res) => {
    let name = req.params.name;
    let user = req.user;

    if (!name) {
        return res.status(400).json({ "message": "missing name, wtf should not happen" });
    }

    let sheet = await Sheet.findOne({
        where: { name: name, userId: user.id },
        attributes: { exclude: ["userId"] },
        include: [{ model: Job }]
    });

    if (!sheet) {
        return res.status(400).json({ "message": "sheet not found" });
    }

    res.status(200).json({ sheet });
}

export const updateSheet = async (req, res) => {
    // Check for user
    let user = req.user;
    if (!user) {
        return res.status(400).json({ "message": "no user found" });
    }

    let oldName = req.params.name;
    if (!oldName) {
        return res.status(400).json({ "message": "missing name in url" });
    }

    // Check for name

    let newName = req.body.name;
    if (!newName) {
        return res.status(400).json({ "message": "missing new name in body's request" });
    }

    // Verify name availability
    let availability = await Sheet.findOne({ where: { name: newName, userId: user.id } });
    if (availability) {
        return res.status(400).json({ "message": "name is not available" });
    }


    // Verify if sheet exists
    let sheet = await Sheet.findOne({ where: { name: oldName, userId: user.id } });
    if (!sheet) {
        return res.status(400).json({ "message": "sheet not found" });
    }


    await Sheet.update({ name: newName }, { where: { name: oldName, userId: user.id } });
    return res.status(200).json({ "message": "sheet updated" });
}

export const deleteSheet = async (req, res) => {
    let name = req.params.name;
    let user = req.user;

    if (!name) {
        return res.status(400).json({ "message": "missing name, wtf should not happen" });
    }

    // Verify if sheet exist
    let sheet = await Sheet.findOne({ where: { name, userId: user.id } });
    if (!sheet) {
        return res.status(400).json({ "message": "sheet not found" });
    }

    await Sheet.destroy({
        where: { name: name, userId: user.id },
    });

    return res.status(200).json({ "message": "sheet deleted successfully !" });
}
