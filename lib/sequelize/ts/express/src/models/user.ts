/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import { Model } from 'sequelize';
import { IUser } from '../interfaces/user.interface';

export default (sequelize, DataTypes) => {
  class User extends Model<IUser> implements IUser {
    public firstName;
    public lastName;
    public email;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'user'
    }
  );
  return User;
};
