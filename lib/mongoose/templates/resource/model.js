module.exports = (model) => {
  const Model = model.charAt(0).toUpperCase() + model.slice(1);

  return `import { Schema, model } from 'mongoose';

const ${model.toLowerCase()}Schema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('${Model}', ${model.toLowerCase()}Schema);
`;
};
