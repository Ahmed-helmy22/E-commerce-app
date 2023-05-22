import express from 'express';
import * as userController from './userContrller.js';
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router.patch('/updateUserPassword/:id', userController.updateUserPassword);

router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.updateUser)
  .get(userController.getUser);

export default router;
