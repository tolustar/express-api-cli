const fs = require('fs-extra');
const path = require('path');

exports.addRouteToRouteIndex = (route) => {
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

exports.addImportToRouteIndex = (route) => {
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

exports.generateFile = async (dir, fileName, lang, dbDriver) => {
  const FileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

  let dirExt = `${dir}.${lang}`;

  //conditonal case for sequelize when generating model
  if (dbDriver === 'sequelize' && dir === 'model') {
    dirExt = `${lang}`;
  }

  //conditonal case for test folder
  let dirs = dir + 's';
  if (dir.includes('test')) {
    dirs = dir;
    dirExt = `test.${lang}`;
  }

  await fs.copy(
    path.resolve(__dirname, `./../lib/${dbDriver}/${lang}/express/src/${dirs}/user.${dirExt}`),
    `./src/${dirs}/${fileName}.${dirExt}`
  );

  const data = fs.readFileSync(`./src/${dirs}/${fileName}.${dirExt}`).toString();

  let newData = data.replace(/user/g, fileName);
  newData = newData.replace(/User/g, FileName);

  fs.writeFileSync(`./src/${dirs}/${fileName}.${dirExt}`, newData);
};
