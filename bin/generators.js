/* eslint-disable max-len */
const fs = require('fs-extra');
const chalk = require('chalk');

const { addRouteToRouteIndex, addImportToRouteIndex, generateFile } = require('./utils');

const generateModel = async (model, config) => {
  if (!model) return;
  try {
    await generateFile('model', model, config.lang, config.dbDriver);

    console.log(chalk.green(`${model}.model.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateController = async (controller, config) => {
  try {
    if (!controller) return;
    await generateFile('controller', controller, config.lang, config.dbDriver);

    console.log(chalk.green(`${controller}.controller.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateService = async (service, config) => {
  try {
    if (!service) return;

    await generateFile('service', service, config.lang, config.dbDriver);
    console.log(chalk.green(`${service}.service.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateRoute = async (route, config) => {
  try {
    if (!route) return;
    await generateFile('route', route, config.lang, config.dbDriver);

    console.log(chalk.green(`${route}.route.${config.lang} generated successfully`));
    addImportToRouteIndex(route);
    addRouteToRouteIndex(route);
  } catch (error) {
    console.log(error);
  }
};

const generateResource = (resource, config) => {
  if (!resource) return;
  generateModel(resource, config);
  generateController(resource, config);
  generateService(resource, config);
  generateRoute(resource, config);
};

const generateValidator = async (validator, config) => {
  try {
    if (!validator) return;
    await fs.writeFile(`./src/validators/${validator}.validator.${config.lang}`, '');
    console.log(chalk.green(`${validator}.validator.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateUtil = async (util, config) => {
  try {
    if (!util) return;
    await fs.writeFile(`./src/utils/${util}.util.${config.lang}`, '');
    console.log(chalk.green(`${util}.util.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateConfig = async (configFile, config) => {
  try {
    if (!configFile) return;
    await fs.writeFile(`./src/config/${configFile}.${config.lang}`, '');
    console.log(chalk.green(`${configFile}.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateMiddleware = async (middleware, config) => {
  try {
    if (!middleware) return;
    await fs.writeFile(`./src/middlewares/${middleware}.middleware.${config.lang}`, '');
    console.log(chalk.green(`${middleware}.middleware.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateUnitTest = async (unittest, config) => {
  try {
    if (!unittest) return;
    // await fs.writeFile(`./src/tests/unit/${unittest}.test.js`, unitTestTemplate(unittest));
    await generateFile('tests/unit', unittest, config.lang, config.dbDriver);

    console.log(chalk.green(`unit/ ${unittest}.test.${config.lang} generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateIntegrationTest = async (integrationtest, config) => {
  try {
    if (!integrationtest) return;

    await generateFile('tests/integration', integrationtest, config.lang, config.dbDriver);

    console.log(
      chalk.green(`integration/ ${integrationtest}.test.${config.lang} generated successfully`)
    );
  } catch (error) {
    console.log(error);
  }
};

const generateTest = async (test, config) => {
  generateUnitTest(test, config);
  generateIntegrationTest(test, config);
};

const checkLangAndDB = async () => {
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

module.exports = async (options) => {
  try {
    let config = await checkLangAndDB();

    generateModel(options.model, config);
    generateController(options.controller, config);
    generateService(options.service, config);
    generateRoute(options.route, config);
    generateResource(options.resource, config);
    generateValidator(options.validator, config);
    generateUtil(options.util, config);
    generateConfig(options.config, config);
    generateMiddleware(options.middleware, config);
    generateUnitTest(options.unittest, config);
    generateIntegrationTest(options.integrationtest, config);
    generateTest(options.test, config);
  } catch (error) {}
};
