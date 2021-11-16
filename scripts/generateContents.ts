import fs from 'fs';
import chalk from 'chalk';

const README = fs.readFileSync('README.md', { encoding: 'utf-8' });

const CONTENTS = '## Contents\n';

const contentsIdx = README.indexOf(CONTENTS);

let READMEWithoutContents = README.slice(0, contentsIdx + CONTENTS.length);

READMEWithoutContents += '\n';

const weeklies = fs.readdirSync('weekly');

weeklies.reverse().forEach((weekly) => {
  READMEWithoutContents += `- [淘系前端架构 - 周刊 - ${weekly.slice(
    9,
    -3
  )} 期](weekly/${encodeURIComponent(weekly)})\n`;
});

console.log(chalk.green(READMEWithoutContents));

fs.writeFileSync('README.md', READMEWithoutContents);
