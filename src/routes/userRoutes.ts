import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
router.post('/create', UserController.createUser);

export { router as userRoutes };
