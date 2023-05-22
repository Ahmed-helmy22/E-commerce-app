import express from 'express';

import * as authController from './authController.js';

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signUp);

export default router;
