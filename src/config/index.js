/*
 *  Created by Neo Hsu on 2016/06/02.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import config from './env/all';
import envProduction from './env/production';
import envDev from './env/development';

const ENV_CONFIG = {
  production: envProduction,
  development: envDev,
};

const env = process.env.NODE_ENV || `development`;
Object.assign(config, ENV_CONFIG[env]);

export default config;
