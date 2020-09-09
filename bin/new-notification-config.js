const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { creatingProjectSpinner } = require('./spinners');

const setupNotificationConfig = async (notification) => {
  const notificationType = getNotificationType(notification);
  await fs.copy(
    path.resolve(__dirname, `./../lib/notification/${notificationType.name}/`),
    `./src/config/mail/${notificationType.name}`
  );
  appendEnvironmentVariable(notificationType.env);
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

const getNotificationType = (type) => {
  const notification = {
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
  return notification[type] || notification['default'];
};

const newNotificationConfig = async () => {
  try {
    if (!checkIfProjectHasBeenCreated()) {
      console.log(
        chalk.cyan(`You need to create at least one project before setting Notification Config`)
      );
      return 'false';
    }
    const template = await inquirer.prompt([
      {
        type: 'list',
        name: 'notificationConfig',
        message: 'Select a notification config',
        choices: ['Sendgrid', 'Mailgun']
      }
    ]);
    await setupNotificationConfig(template.notificationConfig);
    console.log(
      chalk.green(`Notification Config for ${template.notificationConfig} created successfully`)
    );
  } catch (error) {
    creatingProjectSpinner.fail(`${chalk.cyan(`Error creating template`)} -  ${chalk.red(error)}`);
  }
};

module.exports = newNotificationConfig;
