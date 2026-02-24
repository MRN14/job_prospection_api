import request from 'supertest';
import app from '../app';
import sequelize from '../database/database.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/modelSync.js';
beforeAll(async () => {
    try {
        await sequelize.sync({ force: true }); // clean tables before tests
         const createdUser = await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test2@example.com',
    password: 'hashedpassword'
});
 global.testUser = createdUser;
        console.log('Tables are ready for testing.');
    } catch (error) {
        console.error('Error while syncing tables:', error);
    }
});

describe('POST /sheet', () => {

    test('return 400 if missing name with correct token', async () => {

        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/sheet')
            .set('Authorization', `Bearer ${token}`)
            .send({
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "missing name in body's request");
    });
    test('return 201 if sheet created', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/sheet')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Sheet 1'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', "sheet created");
    });
    test('return 400 if sheet already exists', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/sheet')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Sheet 1'
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "sheet already exists");
    });
    test('return 401 if no token provided', async () => {
        const res = await request(app)
            .post('/sheet')
            .send({
                name: 'Sheet 1'
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'You must have to be connected');
    });
    test('return 401 if user not found', async () => {
        const secret = process.env.JWT_SECRET;
         // Generate token
        const user = { id: 999, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/sheet')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Sheet 1'
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "no user found");
    });
});
afterAll(async () => {
   await sequelize.close();
});