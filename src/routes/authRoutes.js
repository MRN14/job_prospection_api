import express from 'express';
const authRouter = express.Router();

// login
authRouter.post('/login', (req, res) => {
    res.send('login');
})

// register
authRouter.post('/register', (req, res) => {
    res.send('register');
})

// logout
authRouter.get('/logout', (req, res) => {
    res.send('logout');
})

export default authRouter;