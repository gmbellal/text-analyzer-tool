import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
router.post('/login', AuthController.login);

export { router as authRoutes };
