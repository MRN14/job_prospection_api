import { Job, Sheet } from "../models/modelSync.js"

export const createJob = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        //Check for job
        let job = req.body.job;
        if (!job) {
            return res.status(400).json({ "message": "missing job name" });
        }

        // Get sheet
        let name = req.params.name;
        const sheet = await Sheet.findOne({ where: { name, userId: user.id } });
        if (!sheet) {
            return res.status(400).json({ "message": "No sheet found" });
        }

        // Create job
        let { companyName, place, status, source, contact, dispatchDate, note, opinion } = req.body;
        await Job.create({ sheetId: sheet.id, job, companyName, place, status, source, contact, dispatchDate, note, opinion });
        return res.status(200).json({ "message": "job succesfully created" });

    } catch (error) {
        res.status(500).json({ "error": error });
    }
}

export const getJob = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        // Check for sheet
        let name = req.params.name;
        const sheet = await Sheet.findOne({ where: { name, userId: user.id } });
        if (!sheet) {
            return res.status(400).json({ "message": "No sheet found" });
        }

        // Check for id
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({ "message": "No id specified" });
        }

        // Check for job
        let job = await Job.findOne({ where: { sheetId: sheet.id, id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
        if (!job) {
            return res.status(400).json({ "message": "No job find" });
        }

        // Return jobs
        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({ "error": error });
    }
}

export const updateJob = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        //Check for job
        let job = req.body.job;
        if (!job) {
            return res.status(400).json({ "message": "missing job name" });
        }

        // Get sheet
        let name = req.params.name;
        const sheet = await Sheet.findOne({ where: { name, userId: user.id } });
        if (!sheet) {
            return res.status(400).json({ "message": "No sheet found" });
        }

        // Create job
        let { companyName, place, status, source, contact, dispatchDate, note, opinion } = req.body;
        await Job.update({ job, companyName, place, status, source, contact, dispatchDate, note, opinion }, { where: { sheetId: sheet.id } });
        return res.status(200).json({ "message": "job succesfully updated" });

    } catch (error) {
        res.status(500).json({ "error": error });
    }
}

export const deleteJob = async (req, res) => {
    try {
        // Check for user
        let user = req.user;
        if (!user) {
            return res.status(400).json({ "message": "no user found" });
        }

        // Check for sheet
        let name = req.params.name;
        const sheet = await Sheet.findOne({ where: { name, userId: user.id } });
        if (!sheet) {
            return res.status(400).json({ "message": "No sheet found" });
        }

        // Check for id
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({ "message": "No id specified" });
        }

        // Check for job
        let job = await Job.findOne({ where: { sheetId: sheet.id, id }, attributes: { exclude: ["createdAt", "updatedAt"] } });
        if (!job) {
            return res.status(400).json({ "message": "No job find" });
        }

        // Delete job
        await Job.destroy({ where: { id } });
        res.status(200).json({ "message": "job succesfully deleted" });

    } catch (error) {
        res.status(500).json({ "error": error });
    }
}