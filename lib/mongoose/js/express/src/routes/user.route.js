import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userController.getAllUsers);
router.post('', newUserValidator, userController.newUser);
router.get('/:_id', userAuth, userController.getUser);
router.put('/:_id', userController.updateUser);
router.delete('/:_id', userController.deleteUser);

export default router;
