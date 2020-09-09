#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');

const getNotificationCommand = (newNotificationConfig) => {
  const notificationConfigCommand = yargs
    .version()
    .command('notification setup', 'Setup notification configuration', (value) => {
      const args = value.argv._;
      if (args[1]) {
        newNotificationConfig(args[1]);
      } else {
        console.log(
          chalk.red(`
        Please provide a notification config. 
  
        Example: 
        exp-api notification config
      `)
        );
      }
    })
    .help().argv;

  return notificationConfigCommand;
};

module.exports = getNotificationCommand;
