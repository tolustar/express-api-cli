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

    //route to get all users
    this.router.get('', this.UserController.getAllUsers);

    //route to create a new user
    this.router.post(
      '',
      this.UserValidator.newUser,
      this.UserController.newUser
    );

    //route to get a single user by their id
    this.router.get('/:id', userAuth, this.UserController.getUser);

    //route to update a user by their id
    this.router.put('/:id', this.UserController.updateUser);

    //route to delete a user by their id
    this.router.delete('/:id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
