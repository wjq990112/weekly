import type { Weekly } from '../generateWeekly';

export default function getWeekly(
  news: Weekly['news'],
  openSource: Weekly['openSource'],
  article: Weekly['article']
) {
  return `## 🗞 News
${news
  .map((item) => {
    return `### **${item.title}**
${item.body}
`;
  })
  .join('\n')}
## 📦 Open Source
${openSource
  .map((item) => {
    return `### **${item.title}**
${item.body}
`;
  })
  .join('\n')}
## 📑 Article
${article
  .map((item) => {
    return `### **${item.title}**
${item.body}
`;
  })
  .join('\n')}`;
}
