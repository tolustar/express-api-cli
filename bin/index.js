#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');

const run = require('./generators');
const newProject = require('./new-project');

const options = yargs
  .version()
  .command('create', 'Create a new Express API Project', (value) => {
    const args = value.argv._;
    if (args[1]) {
      newProject(args[1]);
    } else {
      console.log(
        chalk.red(`
        Please provide a project name. 

        Example: 
        exp-api create AwesomeProject
      `)
      );
    }
  })
  .usage('Usage: express-api-cli')
  .option('m', {
    alias: 'model',
    describe: 'Create new model',
    type: 'string'
  })
  .option('c', {
    alias: 'controller',
    describe: 'Create new controller',
    type: 'string'
  })
  .option('s', {
    alias: 'service',
    describe: 'Create new service',
    type: 'string'
  })
  .option('r', {
    alias: 'route',
    describe: 'Create new route',
    type: 'string'
  })
  .option('R', {
    alias: 'resource',
    describe: 'Create new resource',
    type: 'string'
  })
  .option('u', {
    alias: 'util',
    describe: 'Create new utility file',
    type: 'string'
  })
  .option('M', {
    alias: 'middleware',
    describe: 'Create new middleware',
    type: 'string'
  })
  .option('v', {
    alias: 'validator',
    describe: 'Create new validator',
    type: 'string'
  })
  .option('T', {
    alias: 'test',
    describe: 'Create new unit and integration test',
    type: 'string'
  })
  .option('U', {
    alias: 'unittest',
    describe: 'Create new unit test',
    type: 'string'
  })
  .option('I', {
    alias: 'integrationtest',
    describe: 'Create new integration test',
    type: 'string'
  })
  .option('C', {
    alias: 'config',
    describe: 'Create new config file',
    type: 'string'
  })
  .help().argv;

run(options);
