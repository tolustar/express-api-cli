import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.get('', this.UserController.getAllUsers);
    this.router.post(
      '',
      this.UserValidator.newUser,
      this.UserController.newUser
    );
    this.router.get('/:_id', userAuth, this.UserController.getUser);
    this.router.put('/:_id', this.UserController.updateUser);
    this.router.delete('/:_id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
