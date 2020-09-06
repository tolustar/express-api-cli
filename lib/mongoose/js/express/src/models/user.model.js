import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
