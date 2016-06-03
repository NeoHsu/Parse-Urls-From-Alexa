/*
 *  Created by Neo Hsu on 2016/06/02.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import winston from 'winston';
import path from 'path';

import config from '../config';
import dateFormat from './dateFormat';

const dirname = path.resolve(`./logs`);

const devLogTransport = new winston.transports.Console({
  timestamp: dateFormat(),
  colorize: true,
});

const infoTransport = new winston.transports.File({
  name: `info-file`,
  filename: `${dirname}/info.log`,
  timestamp: dateFormat(),
  level: `info`,
  colorize: true,
});

const warnTransport = new winston.transports.File({
  name: `warn-file`,
  filename: `${dirname}/warn.log`,
  timestamp: dateFormat(),
  level: `warn`,
  colorize: true,
});

const errorTransport = new winston.transports.File({
  name: `error-file`,
  filename: `${dirname}/error.log`,
  timestamp: dateFormat(),
  level: `error`,
  colorize: true,
});

const crashLogger = new winston.transports.File({
  name: `crash-file`,
  filename: `${dirname}/crash.log`,
  level: `error`,
  handleExceptions: true,
  timestamp: dateFormat(),
  humanReadableUnhandledException: true,
  json: false,
  colorize: true,
});

const transportList = [
  infoTransport,
  warnTransport,
  errorTransport,
  crashLogger,
];

if (config.env === `development`) {
  transportList.push(devLogTransport);
}

const logger = new(winston.Logger)({
  transports: transportList,
});

export default logger;
