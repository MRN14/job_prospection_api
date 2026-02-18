import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

let username = process.env.MYSQL_USER;
let password = process.env.MYSQL_PASSWORD;
let port = process.env.MYSQL_PORT;
let database = process.env.MYSQL_DATABASE;

let uri = `mysql://${username}:${password}@database:${port}/${database}`

// Parameters sequelize
const sequelize = new Sequelize(uri)


// Connect to database
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect()

export default sequelize;