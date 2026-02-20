import { jest } from '@jest/globals';
import * as UserModule from '../models/user.js';
import * as bcryptModule from 'bcrypt';
import * as jwtModule from 'jsonwebtoken';
import { login, register, logout } from '../controllers/AuthController.js';

// Créer des mocks manuels après l'import
const User = UserModule.default;
const bcrypt = bcryptModule;
const jwt = jwtModule;

// Spier sur les méthodes
jest.spyOn(User, 'findOne');
jest.spyOn(User, 'create');
jest.spyOn(bcrypt, 'compare');
jest.spyOn(bcrypt, 'hash');
jest.spyOn(jwt, 'sign');

// helper pour simuler res
function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('AuthController - login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
    process.env.EXPIRE_IN = '1h';
  });

  test('retourne 400 si email ou password manquant', async () => {
    const req = { body: {} };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('retourne 400 si email manquant', async () => {
    const req = { body: { password: 'password123' } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('retourne 400 si password manquant', async () => {
    const req = { body: { email: 'user@example.com' } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('retourne 400 si utilisateur non trouvé', async () => {
    const req = { body: { email: 'notfound@example.com', password: 'password123' } };
    const res = mockRes();
    
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'notfound@example.com' } });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unable to verify credentials.' });
  });

  test('retourne 400 si password incorrect', async () => {
    const mockUser = { id: 1, email: 'user@example.com', password: 'hashedPassword' };
    const req = { body: { email: 'user@example.com', password: 'wrongPassword' } };
    const res = mockRes();
    
    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('retourne 200 avec token si login réussi', async () => {
    const mockUser = { id: 1, email: 'user@example.com', password: 'hashedPassword' };
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    const req = { body: { email: 'user@example.com', password: 'password123' } };
    const res = mockRes();
    
    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce(mockToken);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'user@example.com' } });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, email: 'user@example.com' },
      'test-secret',
      { expiresIn: '1h' }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Connected successfully!',
      token: mockToken
    });
  });

  test('retourne 500 en cas d\'erreur serveur', async () => {
    const req = { body: { email: 'user@example.com', password: 'password123' } };
    const res = mockRes();
    
    User.findOne.mockRejectedValueOnce(new Error('Database error'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});

describe('AuthController - register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('retourne 400 si données manquantes', async () => {
    const req = { body: { email: 'user@example.com' } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request body' });
  });

  test('retourne 400 si firstName manquant', async () => {
    const req = { body: { lastName: 'Doe', email: 'user@example.com', password: 'password123' } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request body' });
  });

  test('retourne 400 si lastName manquant', async () => {
    const req = { body: { firstName: 'John', email: 'user@example.com', password: 'password123' } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request body' });
  });

  test('retourne 400 si email manquant', async () => {
    const req = { body: { firstName: 'John', lastName: 'Doe', password: 'password123' } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request body' });
  });

  test('retourne 400 si password manquant', async () => {
    const req = { body: { firstName: 'John', lastName: 'Doe', email: 'user@example.com' } };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid request body' });
  });

  test('retourne 400 si utilisateur existe déjà', async () => {
    const mockUser = { id: 1, email: 'user@example.com', firstName: 'John', lastName: 'Doe' };
    const req = { body: { firstName: 'Jane', lastName: 'Smith', email: 'user@example.com', password: 'password123' } };
    const res = mockRes();
    
    User.findOne.mockResolvedValueOnce(mockUser);

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'user@example.com' } });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unable to verify credentials.' });
  });

  test('crée un nouvel utilisateur avec succès', async () => {
    const createdUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'hashedPassword' };
    const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' } };
    const res = mockRes();
    
    User.findOne.mockResolvedValueOnce(null);
    bcrypt.hash.mockResolvedValueOnce('hashedPassword');
    User.create.mockResolvedValueOnce(createdUser);

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.create).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashedPassword'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User n°1 created successfully!' });
  });

  test('retourne 500 en cas d\'erreur serveur', async () => {
    const req = { body: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' } };
    const res = mockRes();
    
    User.findOne.mockRejectedValueOnce(new Error('Database error'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});

describe('AuthController - logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('retourne 400 si pas de token d\'authentification', async () => {
    const req = { headers: {} };
    const res = mockRes();

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  test('retourne 200 si token valide', async () => {
    const req = { headers: { authorization: 'Bearer token123' } };
    const res = mockRes();

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Disconnected successfully !' });
  });

  test('retourne 500 en cas d\'erreur serveur', async () => {
    const req = { headers: { authorization: 'Bearer token123' } };
    const res = mockRes();
    
    // Simuler une erreur lors de la vérification
    Object.defineProperty(req, 'headers', {
      get: jest.fn(() => {
        throw new Error('Header parse error');
      })
    });

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
