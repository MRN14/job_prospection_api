import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    // Add support for Bearer token in Authorization header
    let token = req.headers['authorization'];
    // If token is in the format "Bearer
    if (token && token.includes('Bearer')) {
        token = token && token.split(' ')[1];
    }
    // If no token is provided, return an error
    if (!token) {
        return res.status(401).json({ message: 'You must have to be connected' });
    }
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If token is invalid, return an error
        if (err) {
            return res.status(401).json({ error: 'An error has occured' });
        }
        // If token is valid, store user info in req.user and call next middleware
        req.user = user;
        next();  
    })
}