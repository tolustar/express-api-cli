import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);

export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

export const updateUser = async (id, body) => {
  await User.update(body, {
    where: { id: id }
  });
  return body;
};

export const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
  return '';
};

export const getUser = async (id) => {
  const data = await User.findByPk(id);
  return data;
};
