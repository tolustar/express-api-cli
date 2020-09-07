import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';

import user from '../models/user';

class UserService {
  private User = user(sequelize, DataTypes);

  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await this.User.findAll();
    return data;
  };

  //create a new user
  public newUser = async (body) => {
    const data = await this.User.create(body);
    return data;
  };

  //update a user
  public updateUser = async (id, body) => {
    await this.User.update(body, {
      where: { id: id }
    });
    return body;
  };

  //delete a user
  public deleteUser = async (id) => {
    await this.User.destroy({ where: { id: id } });
    return '';
  };

  //get a single user
  public getUser = async (id) => {
    const data = await this.User.findByPk(id);
    return data;
  };
}

export default UserService;
