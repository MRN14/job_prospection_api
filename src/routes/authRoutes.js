import express from 'express';
import { login, logout, register} from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const authRouter = express.Router();

// login
authRouter.post('/login', login);

// register
authRouter.post('/register', register);

// logout
authRouter.get('/logout', verifyToken, logout);

export default authRouter;