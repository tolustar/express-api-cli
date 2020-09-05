module.exports = (title) => {
  const Title = title.charAt(0).toUpperCase() + title.slice(1);

  return `import ${Title} from './../models/${title}.model';

export const getAll${Title}s = async () => {
  const data = await ${Title}.find();
  return data;
};

export const new${Title} = async (body) => {
  await ${Title}.create(body);
  return;
};

export const update${Title} = async (id, body) => {
  const data = await ${Title}.findByIdAndUpdate(
    {
      id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

export const delete${Title} = async (id) => {
  await ${Title}.findByIdAndDelete(id);
  return '';
};

export const get${Title} = async (id) => {
  const data = await ${Title}.findById(id);
  return data;
};
`;
};
