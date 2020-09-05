const fs = require('fs-extra');

const addRouteToRouteIndex = (route) => {
  const data = fs.readFileSync('./src/routes/index.js').toString().split('\n');

  let processComplete = false;
  data.forEach((item, index) => {
    if (item.includes('return router') && processComplete === false) {
      const newRoute = `  router.use('/${route}', ${route}Route);`;

      data.splice(index, 0, newRoute);
      const addNewRoute = data.join('\n');

      fs.writeFileSync('./src/routes/index.js', addNewRoute);

      processComplete = true;
    }
  });
};

const addImportToRouteIndex = (route) => {
  const data = fs.readFileSync('./src/routes/index.js').toString().split('\n');

  let processComplete = false;
  data.forEach((item, index) => {
    if (item.includes('import') && processComplete === false && index !== 0) {
      const newImport = `import ${route}Route from './${route}.route';`;

      data.splice(index, 0, newImport);
      const addNewImport = data.join('\n');

      fs.writeFileSync('./src/routes/index.js', addNewImport);

      processComplete = true;
    }
  });
};

exports.addRouteToRouteIndex = addRouteToRouteIndex;
exports.addImportToRouteIndex = addImportToRouteIndex;
