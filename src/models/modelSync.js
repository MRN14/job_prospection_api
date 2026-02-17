import { DataTypes } from "sequelize";
import mySqlConnection from "../database/database";

//import models here

// Sync Models with database / Create missing tables
async function syncModels() {
    try {
        await sequelize.sync();
        console.log('Sync succesfull');
    } catch (error) {
        console.error('Error while synching sequelize :', error);
    }
}

syncModels();

//list models in {}
export { };