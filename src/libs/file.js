/*
 *  Created by Neo Hsu on 2016/06/03.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import fs from 'fs';
import path from 'path';

import {
  logger,
} from '../utilities';

const dirname = path.resolve(`./data`);

exports.writeFile = (_crawlerData) => {
  const resolver = new Promise((resolve, reject) => {
    logger.info(`writeFile: init`);
    logger.info(`crawler data count: ${Object.keys(_crawlerData.parserData).length}`);
    const data = Object.keys(_crawlerData.parserData).join(`\n`);
    fs.writeFile(`${dirname}/alexa_shopping_clothing_data.txt`, data.toString(), (err) => {
      if (err) {
        logger.info(`writeFile: reject`);
        return reject(err);
      }
      logger.info(`writeFile: resolve`);
      resolve(data);
    });
  });
  return resolver;
};

exports.createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
