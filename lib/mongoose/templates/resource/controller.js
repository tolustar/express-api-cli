/* eslint-disable max-len */
module.exports = (title) => {
  const Title = title.charAt(0).toUpperCase() + title.slice(1);

  return `import HttpStatus from 'http-status-codes';
import * as ${Title}Service from './../services/${title}.service';

export const getAll${Title}s = async (req, res, next) => {
  try {
    const data = await ${Title}Service.getAll${Title}s();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: ''
    });
  } catch (error) {
    next(error);
  }
};

export const get${Title} = async (req, res, next) => {
  try {
    const data = await ${Title}Service.get${Title}(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: ''
    });
  } catch (error) {
    next(error);
  }
};

export const new${Title} = async (req, res, next) => {
  try {
    const data = await ${Title}Service.new${Title}(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: ''
    });
  } catch (error) {
    next(error);
  }
};

export const update${Title} = async (req, res, next) => {
  try {
    const data = await ${Title}Service.update${Title}(req.params.id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: ''
    });
  } catch (error) {
    next(error);
  }
};

export const delete${Title} = async (req, res, next) => {
  try {
    const data = await ${Title}Service.update${Title}(req.params.id);
    res.status(HttpStatus.NO_CONTENT).json({
      code: HttpStatus.NO_CONTENT,
      data: data,
      message: ''
    });
  } catch (error) {
    next(error);
  }
};
`;
};
