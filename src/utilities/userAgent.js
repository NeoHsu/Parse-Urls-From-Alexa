/*
 *  Created by Neo Hsu on 2016/06/02.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import randomUserAgent from 'random-useragent';

export default () => {
  const ua = randomUserAgent.getRandom((_ua) => (_ua.deviceType.length === 0));
  return ua;
};
