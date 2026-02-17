// Create express app
import express from 'express'
const app = express();

import mySqlConnection from './database/database.js';


// Router goes here

// Makes data exploitable
app.use(express.json());

// Start server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});