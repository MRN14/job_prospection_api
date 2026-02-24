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
    // test('return 401 if user not found', async () => {
    //     const secret = process.env.JWT_SECRET;
    //      // Generate token
    //     const user = { id: 999, email: global.testUser.email };
    //     const token = jwt.sign(user, secret, { expiresIn: '1h' });
    //     const res = await request(app)
    //         .post('/sheet')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send({
    //             name: 'Sheet 1'
    //         });
    //     expect(res.status).toBe(400);
    //     expect(res.body).toHaveProperty('message', "no user found");
    // });
});
describe('GET /sheet/:name', () => {
    test('return 200 and sheets if valid token provided', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .get('/sheet/Sheet%201')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);

        expect(res.body).toHaveProperty('sheet');

        expect(res.body.sheet).toHaveProperty('id');
        expect(res.body.sheet).toHaveProperty('name', 'Sheet 1');
        expect(res.body.sheet).toHaveProperty('createdAt');
        expect(res.body.sheet).toHaveProperty('updatedAt');
        expect(res.body.sheet).toHaveProperty('Jobs');

        expect(Array.isArray(res.body.sheet.Jobs)).toBe(true);
    }
    );
    test('return 400 if sheet not found', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .get('/sheet/NonExistentSheet')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "sheet not found");
    });
    test('return 401 if no token provided', async () => {
        const res = await request(app)
            .get('/sheet/Sheet%201');

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'You must have to be connected');
    });
});
describe('PUT /sheet/:name', () => {
    test('return 200 if sheet name updated', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .put('/sheet/Sheet%201')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Sheet Name'
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', "sheet updated");
    });
    test('return 400 if missing new name in body', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .put('/sheet/Updated%20Sheet%20Name')
            .set('Authorization', `Bearer ${token}`)
            .send({
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "missing new name in body's request");
    });

    test('return 400 if sheet not found', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .put('/sheet/NonExistentSheet')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Another Name'
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "sheet not found");
    });
    test('return 400 if new name is not available', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .put('/sheet/Updated%20Sheet%20Name')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Sheet Name'
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "name is not available");
    });
})
describe('DELETE /sheet/:name', () => {
    test('return 400 if sheet not found', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .delete('/sheet/NonExistentSheet')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "sheet not found");
    });
    test('return 200 if sheet deleted', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });

        const res = await request(app)
            .delete('/sheet/Updated%20Sheet%20Name')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', "sheet deleted successfully !");
    });
});

afterAll(async () => {
    await sequelize.close();
});