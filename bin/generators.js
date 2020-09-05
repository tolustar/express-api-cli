const fs = require('fs-extra');
const chalk = require('chalk');

const modelTemplate = require('../lib/mongoose/templates/resource/model');
const controllerTemplate = require('../lib/mongoose/templates/resource/controller');
const serviceTemplate = require('../lib/mongoose/templates/resource/service');
const routeTemplate = require('../lib/mongoose/templates/resource/route');
const unitTestTemplate = require('../lib/mongoose/templates/test/unit-test');
const integrationTestTemplate = require('../lib/mongoose/templates/test/integration-test');

const { addRouteToRouteIndex, addImportToRouteIndex } = require('./utils');

const generateModel = async (model) => {
  if (!model) return;
  try {
    await fs.writeFile(`./src/models/${model}.model.js`, modelTemplate(model));
    console.log(chalk.green(`${model}.model.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateController = async (controller) => {
  try {
    if (!controller) return;
    await fs.writeFile(
      `./src/controllers/${controller}.controller.js`,
      controllerTemplate(controller)
    );
    console.log(chalk.green(`${controller}.controller.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateService = async (service) => {
  try {
    if (!service) return;
    await fs.writeFile(`./src/services/${service}.service.js`, serviceTemplate(service));
    console.log(chalk.green(`${service}.service.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateRoute = async (route) => {
  try {
    if (!route) return;
    await fs.writeFile(`./src/routes/${route}.route.js`, routeTemplate(route));
    console.log(chalk.green(`${route}.route.js generated successfully`));
    addImportToRouteIndex(route);
    addRouteToRouteIndex(route);
  } catch (error) {
    console.log(error);
  }
};

const generateResource = (resource) => {
  if (!resource) return;
  generateModel(resource);
  generateController(resource);
  generateService(resource);
  generateRoute(resource);
};

const generateValidator = async (validator) => {
  try {
    if (!validator) return;
    await fs.writeFile(`./src/validators/${validator}.validator.js`, '');
    console.log(chalk.green(`${validator}.validator.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateUtil = async (util) => {
  try {
    if (!util) return;
    await fs.writeFile(`./src/utils/${util}.util.js`, '');
    console.log(chalk.green(`${util}.util.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateMiddleware = async (middleware) => {
  try {
    if (!middleware) return;
    await fs.writeFile(`./src/middlewares/${middleware}.middleware.js`, '');
    console.log(chalk.green(`${middleware}.middleware.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateUnitTest = async (unittest) => {
  try {
    if (!unittest) return;
    await fs.writeFile(`./src/tests/unit/${unittest}.test.js`, unitTestTemplate(unittest));
    console.log(chalk.green(`unit/ ${unittest}.test.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateIntegrationTest = async (integrationtest) => {
  try {
    if (!integrationtest) return;
    await fs.writeFile(
      `./src/tests/integration/${integrationtest}.test.js`,
      integrationTestTemplate(integrationtest)
    );
    console.log(chalk.green(`integration/ ${integrationtest}.test.js generated successfully`));
  } catch (error) {
    console.log(error);
  }
};

const generateTest = async (test) => {
  generateUnitTest(test);
  generateIntegrationTest(test);
};

module.exports = (options) => {
  generateModel(options.model);
  generateController(options.controller);
  generateService(options.service);
  generateRoute(options.route);
  generateResource(options.resource);
  generateValidator(options.validator);
  generateUtil(options.util);
  generateMiddleware(options.middleware);
  generateUnitTest(options.unittest);
  generateIntegrationTest(options.integrationtest);
  generateTest(options.test);
};
