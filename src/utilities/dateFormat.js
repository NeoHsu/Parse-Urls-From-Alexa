/*
 *  Created by Neo Hsu on 2016/06/02.
 *  Copyright (c) 2016 Neo Hsu. All rights reserved.
 */

import moment from 'moment';

export default () => {
  const _moment = moment().format(`YYYY-MM-DD HH:mm:ss:SSS`);
  return _moment;
};
