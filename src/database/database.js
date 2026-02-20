import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

let host = process.env.MYSQL_HOST || 'database';
let username = process.env.MYSQL_USER;
let password = process.env.MYSQL_PASSWORD;
let port = process.env.MYSQL_PORT;
let database = process.env.MYSQL_DATABASE;


// Creation of the Sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    logging: console.log,
});

// Connect to database
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Attempt connection 
connect().catch(err => console.error('Failed to connect:', err));

export default sequelize;