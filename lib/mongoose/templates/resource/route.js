module.exports = (title) => {
  const Title = title.charAt(0).toUpperCase() + title.slice(1);

  return `import express from 'express';
import * as ${title}Controller from './../controllers/${title}.controller';

const router = express.Router();

router.get('', ${title}Controller.getAll${Title}s);
router.post('', ${title}Controller.new${Title});
router.get('/:id', ${title}Controller.get${Title});
router.put('/:id', ${title}Controller.update${Title});
router.delete('/:id', ${title}Controller.delete${Title});

export default router;
`;
};
