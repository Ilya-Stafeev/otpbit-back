import express from 'express';
import {
  registerUser,
  authenticateUser,
  deleteUser,
  changePassword,
  getAllUsers,
  getUserById
} from '../controllers/userController';

const router = express.Router();

// Регистрация нового пользователя
router.post('/register', registerUser);

// Аутентификация пользователя
router.post('/login', authenticateUser);

// Удаление пользователя по ID
router.delete('/users/:id', deleteUser);

// Изменение пароля пользователя
router.patch('/users/:id/password', changePassword);

// Получение всех пользователей
router.get('/users', getAllUsers);

// Получение пользователя по ID
router.get('/users/:id', getUserById);

export default router;