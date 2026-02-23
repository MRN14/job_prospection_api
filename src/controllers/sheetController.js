import { Job, Sheet } from "../models/modelSync.js";

export const createSheet = async (req, res) => {
    try {
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

        // Create sheet
        await Sheet.create({ name, userId: user.id });
        return res.status(201).json({ "message": "sheet created" });

    } catch (error) {
        res.status(500).json({ "message": "an error as occured" });
    }
}

export const getAllSheets = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        // Get user's sheets
        let sheets = await Sheet.findAll({ where: { userId: user.id }, attributes: { exclude: ["userId"] } });
        return res.status(200).json({ sheets });
    } catch (error) {
        res.status(500).json({ "message": "an error as occured" });
    }
}

export const getSheet = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        // Check for name
        let name = req.params.name;
        if (!name) {
            return res.status(400).json({ "message": "missing name" });
        }

        // Get sheet
        let sheet = await Sheet.findOne({
            where: { name: name, userId: user.id },
            attributes: { exclude: ["userId"] },
            include: [{ model: Job }]
        });
        if (!sheet) {
            return res.status(400).json({ "message": "sheet not found" });
        }
        res.status(200).json({ sheet });

    } catch (error) {
        res.status(500).json({ "message": "an error as occured" });
    }
}

export const updateSheet = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        // Check for old name
        let oldName = req.params.name;
        if (!oldName) {
            return res.status(400).json({ "message": "missing name in url" });
        }

        // Check for new name
        let newName = req.body.name;
        if (!newName) {
            return res.status(400).json({ "message": "missing new name in body's request" });
        }

        // Verify name availability
        let availability = await Sheet.findOne({ where: { name: newName, userId: user.id } });
        if (availability) {
            return res.status(400).json({ "message": "name is not available" });
        }

        // Check for sheet
        let sheet = await Sheet.findOne({ where: { name: oldName, userId: user.id } });
        if (!sheet) {
            return res.status(400).json({ "message": "sheet not found" });
        }

        // Update sheet
        await Sheet.update({ name: newName }, { where: { name: oldName, userId: user.id } });
        return res.status(200).json({ "message": "sheet updated" });

    } catch (error) {
        res.status(500).json({ "message": "an error as occured" });
    }
}

export const deleteSheet = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        // Check for name
        let name = req.params.name;
        if (!name) {
            return res.status(400).json({ "message": "missing name, wtf should not happen" });
        }

        // Check for sheet
        let sheet = await Sheet.findOne({ where: { name, userId: user.id } });
        if (!sheet) {
            return res.status(400).json({ "message": "sheet not found" });
        }

        // Delete sheet
        await Sheet.destroy({ where: { name: name, userId: user.id } });
        return res.status(200).json({ "message": "sheet deleted successfully !" });

    } catch (error) {
        res.status(500).json({ "message": "an error as occured" });
    }
}
