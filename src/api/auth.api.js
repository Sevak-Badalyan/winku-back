import express from "express";
import AuthController from '../auth/auth.controller'
import AuthMiddlaware from '../auth/auth.middlware';

import { AuthValidationMiddleware } from '../middlewares/validation';


const router = express.Router();

router.post('/login', AuthValidationMiddleware.validateLoginArgs, AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/register', AuthValidationMiddleware.validateRegisterArgs, AuthController.register);

export default router;