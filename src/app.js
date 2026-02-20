// Create express app
import express from 'express';
import cors from 'cors';
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to enable CORS
app.use(cors());

// Import models first - this triggers database sync
import { User, Job, Sheet } from './models/modelSync.js';

// Temporary route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Routers go here
import authRouter from './routes/authRoutes.js';
import sheetRouter from './routes/sheetRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import { verifyToken } from './middlewares/authMiddleware.js';

app.use('/auth', authRouter);
app.use('/sheet', verifyToken, sheetRouter);
app.use('/job', jobRouter);

// Start server on port 3000 unless running tests
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;