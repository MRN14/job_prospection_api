import sequelize from "../database/database.js";

import Job from "./job.js";
import User from "./user.js";
import Sheet from "./sheet.js";

// Define associations
User.hasMany(Sheet, { foreignKey: "userId" });
Sheet.belongsTo(User, { foreignKey: "userId" });

Sheet.hasMany(Job, { foreignKey: "sheetId", onDelete: 'CASCADE' });
Job.belongsTo(Sheet, { foreignKey: "sheetId" });
// Sync Models with database / Create missing tables
async function syncModels() {
    try {
        // First authenticate the connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Then sync the models
        await sequelize.sync();
        console.log('Sync successful');
    } catch (error) {
        console.error('Error while synching sequelize :', error);
    }
}

syncModels();

//list models in {}
export {
    User,
    Job,
    Sheet
 };