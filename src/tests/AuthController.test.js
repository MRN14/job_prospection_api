import request from 'supertest';
import app from '../app';
import sequelize from '../database/database.js';
import jwt from 'jsonwebtoken';
beforeAll(async () => {
  try {
    await sequelize.sync({ force: true }); // créer les tables si elles n'existent pas
    console.log('Tables are ready for testing.');
  } catch (error) {
    console.error('Error while syncing tables:', error);
  }
});
describe('POST /auth/register', () => {

  test('return 400 if missing firstName', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        lastName: 'Dupont',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing lastName', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'test@example.com'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing all body elements', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing lastName and fistName', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing email and password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean',
        lastName: 'Dupont'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing firstName, lastName and email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        password: 'password123',
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing firstName, lastName and password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing firstName, email and password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        lastName: 'Dupont'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return 400 if missing lastName, email and password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid request body');
  });
  test('return good response if all body elements are present', async () => {

    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully!');

  });
  test('return 400 if user already exists', async () => {

    // Second registration (duplicate)
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Unable to verify credentials');

  });
});
describe('POST /auth/login', () => {
  test('return 400 if missing email', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
  test('return 400 if missing password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
  test('return 400 if missing all body elements', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
  test('return 200 and token if credentials are correct', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com'
        , password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'Connected successfully!');
    expect(res.body).toHaveProperty('token');
  });
});
describe('GET /auth/logout', () => {
  test('return 401 if no token provided', async () => {
    const res = await request(app)
      .get('/auth/logout');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'You must have to be connected');
  });
  test('return 200 if valid token provided', async () => {
    const secret = process.env.JWT_SECRET || 'ma_super_secret';

    // Generate token
    const user = { id: 1, email: 'test@example.com' };
    const token = jwt.sign(user, secret, { expiresIn: '1h' });

    // Use token to access protected route
    const res = await request(app)
      .get('/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Disconnected successfully !');
  });
});
afterAll(async () => {
  try {
    await sequelize.sync({ force: true }); // créer les tables si elles n'existent pas
    console.log('Tables are ready for testing.');
  } catch (error) {
    console.error('Error while syncing tables:', error);
  }
});