import fs from 'fs';
import path from 'path';
import { logger, SNIPE_LIST_REFRESH_INTERVAL } from '../helpers';

export class SnipeListCache {
  private snipeList: string[] = [];
  private fileLocation = path.join(__dirname, '../snipe-list.txt');

  constructor() {
    setInterval(() => this.loadSnipeList(), SNIPE_LIST_REFRESH_INTERVAL);
  }

  public init() {
    this.loadSnipeList();
  }

  public isInList(mint: string) {
    return this.snipeList.includes(mint);
  }

  private loadSnipeList() {
    logger.trace(`Refreshing snipe list...`);

    const count = this.snipeList.length;
    const data = fs.readFileSync(this.fileLocation, 'utf-8');
    this.snipeList = data
      .split('\n')
      .map((a) => a.trim())
      .filter((a) => a);

    if (this.snipeList.length != count) {
      logger.info(`Loaded snipe list: ${this.snipeList.length}`);
    }
  }
}

// ASHDLADXZCZC
// 2013-09-27T16:28:28 – LAFkqA72RMIFK4EUBgW9
// 2013-10-29T05:29:58 – VihxV7Tj2TRRVZW069fS
// 2013-11-01T03:37:47 – 2gJWWWBsLyJYLyZBGz1U
// 2015-01-22T12:21:07 – 5LwJxasBR5osnEfKUvHP
// 2016-02-16T22:26:06 – KWRV4YwoDwpBmHjP9WQ0
// 2016-10-04T14:39:43 – WW4cW44CoYzlUnj2XwAV
// 2018-04-10T08:03:13 – LeuVkSWGG7jlfMeLMGJW
// 2019-04-08T23:49:00 – IOepo8FM8Sl4dPuYrwS3
// 2021-07-18T23:56:54 – 85pubYFe02sduC6Wl3Ci
// 2021-07-28T13:39:34 – tG29oIPXpSCNSTNYFOvK
// 2021-12-25T14:40:39 – d0Dx6lW4RGIzmNE4HdJM
