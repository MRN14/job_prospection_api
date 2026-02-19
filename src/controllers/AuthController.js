import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/**
 *  
 * @param {import{'express'} Request} req 
 * @param {import{'express'} Response} res 
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
    try {
        // Body data extraction
        const { email, password } = req.body

        // Verification of input data
        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Get user by email
        const user = await User.findOne({ where: { email } });

        // If user not found
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const check = await bcrypt.compare(password, user.password);

        // If password is incorrect
        if (!check) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            status: 'Connected successfully!',
            token
        })

    } catch (message) {
        console.message(message);
        // Renvoie du erreur générique en d'erreur serveur
        return res.status(500).json({ message: 'Internal server error' })

    }
}

export const register = async (req, res) => {

    try {
        const {lastName, firstName, email, password } = req.body;

        // Verification of input data
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Invalid request body' })
        }
        const existingUser = await User.findOne({ where: { email } });
        if(existingUser) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({lastName, firstName, email, password: hashPassword });

        // Check if user was created
        if (!user) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        return res.status(201).json({ message: `User n°${user.id} created successfully!` });
    } catch (error) {
        console.error(error);
        // Server error
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export const logout = async (req, res) => {
    // Verify if the user is authenticated by checking the Authorization header
    try {

    const authHeader = req.headers.authorization;
    // If no token is provided, return an error
    if (!authHeader) {
        
        return res.status(400).json({ message: "Invalid credentials" });
    }
    // return a success status, the client should handle token deletion on their side
    return res.status(200).json({ message: "Disconnected successfully !" });
        
    } 
    catch (error) {
       console.error(error);
       return res.status(500).json({ message: 'Internal server error' }) 
    }
    
};