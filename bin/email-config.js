const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { spinner, checkLangAndDB } = require('./utils');

const setupEmailConfig = async (emailConfig, lang) => {
  let langAlias = lang === 'Javascript' ? 'js' : 'ts';
  const emailType = getEmailConfigType(emailConfig);
  await fs.copy(
    path.resolve(
      __filename,
      // eslint-disable-next-line max-len
      `./../../lib/email/${langAlias}/${emailType.name}.${langAlias}`
    ),
    `./src/config/mail/${emailType.name}.${langAlias}`
  );
  appendEnvironmentVariable(emailType.env);
};

const checkIfProjectHasBeenCreated = () => {
  try {
    return fs.statSync('package.json').isFile();
  } catch (err) {
    return false;
  }
};

const appendEnvironmentVariable = (env) => {
  fs.appendFile('.env', env, function (err) {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
};

const getEmailConfigType = (type) => {
  const emailEnv = {
    Sendgrid: {
      name: 'sendgrid',
      env: '\nSENDGRID_KEY= ' + '\nSENDGRID_FROM='
    },
    Mailgun: {
      name: 'mailgun',
      env: '\nMAILGUN_DOMAIN= ' + '\nMAILGUN_API_KEY='
    },
    default: {
      name: 'sendgrid',
      env: '\nENDGRID_KEY= ' + '\nSENDGRID_FROM='
    }
  };
  return emailEnv[type] || emailEnv['default'];
};

const newEmailConfig = async () => {
  try {
    if (!checkIfProjectHasBeenCreated()) {
      console.log(
        chalk.cyan(`You need to create at least one project before setting up Email Config`)
      );
      return 'false';
    }
    const template = await inquirer.prompt([
      {
        type: 'list',
        name: 'emailConfig',
        message: 'Select an Email Configuration',
        choices: ['Sendgrid', 'Mailgun']
      }
    ]);

    const { lang } = await checkLangAndDB();
    const projectLanguage = lang === 'js' ? 'Javascript' : 'Typescript';

    await setupEmailConfig(template.emailConfig, projectLanguage);
    console.log(
      chalk.green(`Notification Config for ${template.emailConfig} created successfully`)
    );
  } catch (error) {
    spinner.fail(`${chalk.cyan(`Error creating template`)} -  ${chalk.red(error)}`);
  }
};

module.exports = newEmailConfig;
