import User from '../models/user.model';

export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
