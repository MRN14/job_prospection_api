// Create express app
import express from 'express';
const app = express();

// Connect to database
import mySqlConnection from './database/database.js';

// Temporary route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Routers go here
import authRouter from './routes/authRoutes.js';
import sheetRouter from './routes/sheetRoutes.js';
import jobRouter from './routes/jobRoutes.js';

app.use('/auth', authRouter);
app.use('/sheet', sheetRouter);
app.use('/job', jobRouter);

// Start server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});