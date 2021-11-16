import axios from 'axios';

interface Issues {
  title: string;
  body: string;
  created_at: Date;
}

axios.defaults.baseURL = 'https://api.github.com';

axios
  .get<Issues[]>('/repos/wjq990112/weekly/issues', { params: { since: '' } })
  .then((result) => {
    const { data } = result;
    console.log('data :>> ', data);
  })
  .catch((error) => {
    console.log('error :>> ', error);
  });
