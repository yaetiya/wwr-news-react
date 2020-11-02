// import axios from 'axios';
import { TagsState } from '../../store/ducks/tags/typescript/state';

export const TagsApi = {
  // fetchTags(): Promise<TagsState['items']> {
  //   return axios.get('/tags').then(({ data }) => data);
  // },
  fetchTags(): TagsState['items'] {
    return [
      {
        "_id": "5f625ff106bc4fd2a1e7bf710",
        "name": "Технологии",
      },
      {
        "_id": "5f625ff206bc4fda21e7bf710",
        "name": "Наука",
      },
    ]
  },
};
