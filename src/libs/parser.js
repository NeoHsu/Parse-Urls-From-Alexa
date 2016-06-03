/*
 *  Created by Neo Hsu on 2016/06/02.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import htmlparser from 'htmlparser2';
import Cornet from 'cornet';
import req from 'request';
import $ from 'cheerio';

import {
  userAgent,
  logger,
} from '../utilities';
import config from '../config';

exports.fetchWebAndFilterDOM = (_crawlerData) => {
  const crawlerData = _crawlerData;
  const resolver = new Promise((resolve, reject) => {
    logger.info(`fetchWebAndFilterDOM: init`);
    const Parser = htmlparser.WritableStream;
    const cornet = new Cornet({
      normalizeWhitespace: true,
    });
    crawlerData.currentUrl = crawlerData.host + crawlerData.urlList.pop();
    logger.info(`fetchWebAndFilterDOM: ${crawlerData.currentUrl}`);
    const options = {
      url: crawlerData.currentUrl,
      headers: {
        'User-Agent': userAgent(),
      },
    };

    req(options).pipe(new Parser(cornet));
    cornet.remove(`script`);
    cornet.remove(`header`);
    cornet.remove(`footer`);
    cornet.remove(`iframe`);
    cornet.remove(`noscript`);

    const onElement = cornet.select(crawlerData.selector, (element) => {
      crawlerData.elements = $(element);
      logger.info(`fetchWebAndFilterDOM: resolve`);
      resolve(_crawlerData);
      cornet.removeListener(`element`, onElement);
    });
  });
  return resolver;
};

exports.checkCategoryUpperLimit = (_crawlerData) => {
  const crawlerData = _crawlerData;
  const categories = [];
  const _url = [];

  crawlerData.elements.find(`div.categories li`).each((_, elem) => {
    categories.push(
      $(elem).find(`span.small`).text()
      .replace(/[^0-9$]/g, ``)
    );
    _url.push($(elem).find(`a`).attr(`href`));
  });
  const resolver = new Promise((resolve, reject) => {
    logger.info(`checkCategoryUpperLimit: init`);
    if (isOverUpperLimit(categories)) {
      logger.info(`checkCategoryUpperLimit: resolve`);
      resolve(crawlerData);
    } else {
      crawlerData.urlList = crawlerData.urlList.concat(_url);
      logger.info(`checkCategoryUpperLimit: reject`);
      reject(crawlerData);
    }
  });
  return resolver;
};

exports.fetchNextPageUrl = (_crawlerData) => {
  const crawlerData = _crawlerData;
  const resolver = new Promise((resolve, reject) => {
    logger.info(`fetchNextPageUrl: init`);
    const url = crawlerData.elements.find(`a.next`).attr(`href`);
    if (url !== undefined) {
      crawlerData.urlList.push(url);
    }
    logger.info(`fetchNextPageUrl: resolve`);
    resolve(crawlerData);
  });
  return resolver;
};

exports.fetchSourceUrl = (_crawlerData) => {
  const crawlerData = _crawlerData;
  crawlerData.elements.find(`p.desc-paragraph a`).each((_, elem) => {
    crawlerData.parserData[$(elem).text()] = 1;
  });
  const resolver = new Promise((resolve, reject) => {
    logger.info(`fetchSourceUrl: init`);
    logger.info(`fetchSourceUrl: resolve`);
    logger.warn(`fetchSourceUrl: ${crawlerData.currentUrl}`);
    resolve(crawlerData);
  });
  return resolver;
};

exports.checkUrlList = (_crawlerData) => {
  const crawlerData = _crawlerData;
  logger.info(crawlerData.urlList);
  const resolver = new Promise((resolve, reject) => {
    logger.info(`checkUrlList: init`);
    if (crawlerData.urlList.length === 0) {
      logger.info(`checkUrlList: resolve`);
      resolve(crawlerData);
    } else {
      logger.info(`checkUrlList: reject`);
      reject(crawlerData);
    }
  });
  return resolver;
};

function isOverUpperLimit(arrayList) {
  const sum = arrayList.reduce((pv, cv) => pv + parseInt(cv, 10), 0);
  return sum < config.parser.upperLimit;
}
