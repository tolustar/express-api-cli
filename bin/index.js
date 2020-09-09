#!/usr/bin/env node

const run = require('./generators');
const getNotificationCommand = require('./cli/notification');
const getNewProjectCommand = require('./cli/project');
const newNotificationConfig = require('./new-notification-config');
const newProject = require('./new-project');

const notificationConfigCommand = getNotificationCommand(newNotificationConfig);
const projectCommand = getNewProjectCommand(newProject);

run(notificationConfigCommand);
run(projectCommand);
