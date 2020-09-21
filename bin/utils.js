/* eslint-disable max-len */
const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');

exports.addRouteToRouteIndex = (route, lang) => {
  const data = fs.readFileSync(`./src/routes/index.${lang}`).toString().split('\n');

  let processComplete = false;
  data.forEach((item, index) => {
    if (item.includes('return router') && processComplete === false) {
      let newRoute = `  router.use('/${route}', ${route}Route);`;
      if (lang === 'ts') {
        newRoute = `  router.use('/${route}', new ${route}Route().getRoutes());`;
      }

      data.splice(index, 0, newRoute);
      const addNewRoute = data.join('\n');

      fs.writeFileSync(`./src/routes/index.${lang}`, addNewRoute);

      processComplete = true;
    }
  });
};

exports.addImportToRouteIndex = (route, lang) => {
  const data = fs.readFileSync(`./src/routes/index.${lang}`).toString().split('\n');

  let processComplete = false;
  data.forEach((item, index) => {
    if (item.includes('import') && processComplete === false && index !== 0) {
      const newImport = `import ${route}Route from './${route}.route';`;

      data.splice(index, 0, newImport);
      const addNewImport = data.join('\n');

      fs.writeFileSync(`./src/routes/index.${lang}`, addNewImport);

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

exports.checkLangAndDB = async () => {
  let config = {
    lang: 'js',
    dbDriver: 'mongoose'
  };

  let files = fs.readdirSync('./src/');
  const file = files.find((item) => item.includes('.ts'));
  if (file) {
    config.lang = 'ts';
  }

  let db = null;
  try {
    if (config.lang === 'js') {
      db = await fs.readFile('./src/config/database.js');
    } else {
      db = await fs.readFile('./src/config/database.ts');
    }
    db = db.toString();
  } catch (error) {
    console.log(
      chalk.yellow(`
        Database config not detected in src/config.
        express-api-cli shall assume project default database config uses mongoose. Thank you.      
      `)
    );
  }

  if (db && db.includes('mongoose') && db.includes('sequelize')) {
    console.log(
      chalk.yellow(`
      Application contains more than one DB configuration in src/config/database.js.
      Please use one db configuration or remove unused imports to allow express-api-cli function properly. 

      In the meantime Express-api-cli shall use mongoose database configuration  
      Thank you.      
    `)
    );
  } else {
    if (db && db.includes('sequelize')) {
      config.dbDriver = 'sequelize';
    }
  }

  return config;
};

exports.spinner = ora({
  spinner: 'star2'
});
