import request from 'supertest';
import app from '../app';
import sequelize from '../database/database.js';
import jwt from 'jsonwebtoken';
import { User, Sheet } from '../models/modelSync.js';
beforeAll(async () => {
    try {
        await sequelize.sync({ force: true }); // clean tables before tests
        const createdUser = await User.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test2@example.com',
            password: 'hashedpassword'
        });
        const createdSheet = await Sheet.create({ name: 'Sheet 1', userId: createdUser.id });    
        global.testUser = createdUser;
        global.testSheet = createdSheet;
        console.log('Tables are ready for testing.');
    } catch (error) {
        console.error('Error while syncing tables:', error);
    }
});
describe('POST /job/:name', () => {
    test('return 400 if missing job with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/job/Sheet%201') // use the name of the created sheet
            .set('Authorization', `Bearer ${token}`)
            .send({
                companyName: 'Company A',
                place: 'City A',
                status: 'application sent',
                source: 'https://www.example.com',
                contact: 'test@example.com',
                dispatchDate: '2023-10-01',
                note: 'This is a note.',
                opinion: 4,
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "missing job name");
    });
    test('return 400 if sheet not found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/job/SheetNoexisting') // use the name of the created sheet
            .set('Authorization', `Bearer ${token}`)
            .send({
                job: 'Software Engineer',
                companyName: 'Company A',
                place: 'City A',
                status: 'application sent',
                source: 'https://www.example.com',
                contact: 'test@example.com',
                dispatchDate: '2023-10-01',
                note: 'This is a note.',
                opinion: 4,
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "No sheet found");
    });
    test('return 201 if job created with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .post('/job/Sheet%201') // use the name of the created sheet
            .set('Authorization', `Bearer ${token}`)
            .send({
                job: 'Software Engineer',
                companyName: 'Company A',
                place: 'City A',
                status: 'application sent',
                source: 'https://www.example.com',
                contact: 'test@example.com',
                dispatchDate: '2023-10-01',
                note: 'This is a note.',
                opinion: 4,
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', "job succesfully created");
        
    });
    
});
describe('GET /job/:name/:id', () => {
    test('return 400 if no sheet found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .get('/job/NonExistingSheet/1') // non existing sheet name
            .set('Authorization', `Bearer ${token}`)
            
            
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "No sheet found");
    });
    test('return 400 if no job found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .get('/job/Sheet%201/9999') // non existing job id
            .set('Authorization', `Bearer ${token}`)
            

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "No job find");
    });
    test('return 200 if job found with correct token', async () => {
        const secret = process.env.JWT_SECRET;
        
        // Generate token   
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        // First create a job to ensure it exists
        const res = await request(app)
            .get('/job/Sheet%201/1')
            .set('Authorization', `Bearer ${token}`)
            
        
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('job', 'Software Engineer');
            expect(res.body).toHaveProperty('companyName', 'Company A');
            expect(res.body).toHaveProperty('place', 'City A');
            expect(res.body).toHaveProperty('status', 'application sent');
            expect(res.body).toHaveProperty('source', 'https://www.example.com');
            expect(res.body).toHaveProperty('contact', 'test@example.com');
            expect(res.body).toHaveProperty('dispatchDate');
            expect(res.body).toHaveProperty('note', 'This is a note.');
            expect(res.body).toHaveProperty('opinion', 4);
    });

});
describe('PUT /job/:name/:id', () => {
    test('return 400 if no sheet found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .put('/job/NonExistingSheet/1') // non existing sheet name
            .set('Authorization', `Bearer ${token}`)
            .send({
                job: 'Software Engineer',
                companyName: 'Company A',
                place: 'City A',
                status: 'application sent',
                source: 'https://www.example.com',
                contact: 'test@example.com',
                dispatchDate: '2023-10-01',
                note: 'This is a note.',
                opinion: 4,
                sheetId: global.testSheet.id
            });
            
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "No sheet found");
    });
    test('return 400 if no job found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .put('/job/Sheet%201/1') // non existing job id
            .set('Authorization', `Bearer ${token}`)
            .send({
                companyName: 'Company A',
                place: 'City A',
                status: 'application sent',
                source: 'https://www.example.com',
                contact: 'test@example.com',
                dispatchDate: '2023-10-01',
                note: 'This is a note.',
                opinion: 4,
                sheetId: global.testSheet.id
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "missing job name");
    });
    test('return 200 if job updated with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .put('/job/Sheet%201/1') // use the name of the created sheet and job id
            .set('Authorization', `Bearer ${token}`)
            .send({
                job: 'Software Engineer',
                companyName: 'Company B',
                place: 'City B',
                status: 'application sent',
                source: 'https://www.example2.com',
                contact: 'test@example.com',
                dispatchDate: '2023-10-01',
                note: 'This is a note!!',
                opinion: 2,
                sheetId: global.testSheet.id
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', "job succesfully updated");
    });
});
describe('DELETE /job/:name/:id', () => {
    test('return 400 if no sheet found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .delete('/job/NonExistingSheet/1') // non existing sheet name
            .set('Authorization', `Bearer ${token}`)
            
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "No sheet found");
    });
    test('return 400 if no job found with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        const res = await request(app)
            .delete('/job/Sheet%201/9999') // non existing job id
            .set('Authorization', `Bearer ${token}`)
            

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', "No job find");
    });
    test('return 200 if job deleted with correct token', async () => {
        const secret = process.env.JWT_SECRET;

        // Generate token
        const user = { id: global.testUser.id, email: global.testUser.email };
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        // First create a job to ensure it exists
        const res = await request(app)
            .delete('/job/Sheet%201/1') // use the name of the created sheet and job id
            .set('Authorization', `Bearer ${token}`)
            
        
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', "job succesfully deleted");
     });
    
});