/*
 *  Created by Neo Hsu on 2016/06/02.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import parser from './libs/parser';
import file from './libs/file';

import {
  logger,
} from './utilities';

const crawlerData = {
  host: `http://www.alexa.com`,
  currentUrl: ``,
  selector: `body`,
  urlList: [`/topsites/category/Top/Shopping/Clothing`],
  parserData: {},
  elements: {},
};

function loop(_crawlerData) {
  return parser.fetchWebAndFilterDOM(crawlerData)
    .then(parser.checkCategoryUpperLimit)
    .then(parser.fetchNextPageUrl)
    .then(parser.fetchSourceUrl)
    .then(parser.checkUrlList)
    .catch(loop);
}

file.createDirectory(`./logs`);
file.createDirectory(`./data`);

loop(crawlerData)
  .then(file.writeFile)
  .then((v) => {
    logger.info(`done`);
  })
  .catch((v) => {
    logger.error(v);
  });
