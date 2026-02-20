import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

let host = process.env.MYSQL_HOST || 'database';
let username = process.env.MYSQL_USER;
let password = process.env.MYSQL_PASSWORD;
let port = process.env.MYSQL_PORT;
let database = process.env.MYSQL_DATABASE;

// Test-specific MySQL variables 
let testHost = process.env.MYSQL_TEST_HOST;
let testUser = process.env.MYSQL_TEST_USER;
let testPassword = process.env.MYSQL_TEST_PASSWORD;
let testPort = process.env.MYSQL_TEST_PORT;
let testDatabase = process.env.MYSQL_TEST_DATABASE;

// Create Sequelize instance
let sequelize;
if (process.env.NODE_ENV === 'test') {
    // If test MySQL credentials are provided, use MySQL for tests
    if (testDatabase) {
        sequelize = new Sequelize(testDatabase, testUser, testPassword, {
            host: testHost || 'dbtest',
            port: testPort || 3306,
            dialect: 'mysql',
            logging: false,
        });
    } else {
        // fallback: in-memory SQLite for tests
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        });
    }
} else {
    // Creation of the Sequelize instance for non-test environments
    sequelize = new Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: 'mysql',
        logging: console.log,
    });
}

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