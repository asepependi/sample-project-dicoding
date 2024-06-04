import { openDB } from 'idb';
import config from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = config;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRest = {
  async getData() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async createData(data) {
    return (await dbPromise).put(OBJECT_STORE_NAME, data);
  },
  async getFavorite(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async deleteData(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRest;
