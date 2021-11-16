import fs from 'fs';
import chalk from 'chalk';
import axios from 'axios';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import getWeekly from './template/weekly';

interface Issue {
  title: string;
  body: string;
  created_at: Date;
}

interface WeeklyItem {
  title: string;
  body: string;
}

export interface Weekly {
  news: WeeklyItem[];
  openSource: WeeklyItem[];
  article: WeeklyItem[];
  [key: string]: WeeklyItem[];
}

dayjs.extend(weekday);

axios.defaults.baseURL = 'https://api.github.com';

const weekly: Weekly = {
  news: [],
  openSource: [],
  article: [],
  test: [],
};

const sinceDate = dayjs().weekday(-6).toDate();

const nowDate = dayjs().weekday(1).format('YYYYMMDD');

axios
  .get<Issue[]>('/repos/wjq990112/weekly/issues', {
    params: { since: sinceDate },
  })
  .then((result) => {
    const { data } = result;

    data.forEach((issue) => {
      const { title, body } = issue;

      if (/^\[news\]/i.test(title)) {
        weekly.news.push({ title: title.replace(/^\[news\] /i, ''), body });
        return;
      }

      if (/^\[open source\]/i.test(title)) {
        weekly.openSource.push({
          title: title.replace(/^\[open source\] /i, ''),
          body,
        });
        return;
      }

      if (/^\[article\]/i.test(title)) {
        weekly.article.push({
          title: title.replace(/^\[article\] /i, ''),
          body,
        });
        return;
      }

      if (/^\[test\]/i.test(title)) {
        weekly.test.push({
          title: title.replace(/^\[test\] /i, ''),
          body,
        });
        return;
      }
    });
  })
  .catch((error) => {
    console.error(chalk.red(error));
  })
  .finally(() => {
    const Weekly = getWeekly(weekly.news, weekly.openSource, weekly.article);

    console.log(chalk.green('Weekly:\n'));
    console.log(Weekly);

    fs.writeFileSync(`weekly/Weekly ${nowDate}.md`, Weekly);
  });
