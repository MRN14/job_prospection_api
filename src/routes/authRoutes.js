import express from 'express';
import { login, logout, register} from '../controllers/AuthController.js';

const authRouter = express.Router();

// login
authRouter.post('/login', login);

// register
authRouter.post('/register', register);

// logout
authRouter.get('/logout', logout);

export default authRouter;