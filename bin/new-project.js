const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { creatingProjectSpinner, npmInstallSpinner } = require('./spinners');

const npmInstall = (projectName) => {
  npmInstallSpinner.start(chalk.cyan(`Installing required packages for ${projectName}`));

  const { spawn } = require('child_process');

  const installationProcess = spawn(`cd ${projectName} && npm install`, {
    shell: true
  });

  installationProcess.on('error', () => {
    npmInstallSpinner.fail(
      chalk.red(
        `
        An error occured, please try again. 
        If problem persist please raise an issue on Github`
      )
    );
  });

  installationProcess.on('close', () => {
    npmInstallSpinner.succeed(chalk.green(`Packages installed successfully`));

    console.log(
      chalk.green(`
      🥳🥳🥳🥳🥳
    Voila!!! ${projectName} is ready for development. 

    Create something Awesome
       🚀🚀🚀🚀🚀

    Visit https://google.com for Express

    `)
    );
  });
};

const projectToInstall = async (selectLang, selectDbDriver, projectName) => {
  if (selectLang === 'Javascript' && selectDbDriver === 'Mongoose') {
    await fs.copy(path.resolve(__dirname, './../lib/mongoose/js/express'), `./${projectName}`);
  }
  if (selectLang === 'Javascript' && selectDbDriver === 'Sequelize') {
    await fs.copy(path.resolve(__dirname, './../lib/sequelize/js/express'), `./${projectName}`);
  }
  if (selectLang === 'Typescript' && selectDbDriver === 'Mongoose') {
    await fs.copy(path.resolve(__dirname, './../lib/mongoose/ts/express'), `./${projectName}`);
  }
  if (selectLang === 'Typescript' && selectDbDriver === 'Sequelize') {
    await fs.copy(path.resolve(__dirname, './../lib/sequelize/ts/express'), `./${projectName}`);
  }
};

const newProject = async (projectName) => {
  try {
    const template = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectLang',
        message: 'Select a development language',
        choices: ['Javascript', 'Typescript']
      },
      {
        type: 'list',
        name: 'selectDbDriver',
        message: 'Select a database driver',
        choices: ['Mongoose', 'Sequelize']
      }
    ]);

    creatingProjectSpinner.start(chalk.cyan(`Creating ${projectName}`));
    await projectToInstall(template.selectLang, template.selectDbDriver, projectName);

    creatingProjectSpinner.succeed(chalk.green(`${projectName} created successfully`));

    npmInstall(projectName);
  } catch (error) {
    creatingProjectSpinner.fail(
      `${chalk.cyan(`Error creating ${projectName}`)} -  ${chalk.red(error)}`
    );
  }
};

module.exports = newProject;
