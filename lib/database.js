/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';
// eslint-disable-next-line import/extensions
import Constants from './constants.js';

class Database {
  _instance = null;

  client = null;

  // config has all DB settings
  // TODO: Add connection pool
  init = async (config) => {
    this.client = new MongoClient(config.url, {
      minPoolSize: config.minPoolSize,
      maxPoolSize: config.maxPoolSize,
    });
    await this.client.connect();
    // eslint-disable-next-line no-underscore-dangle
    this._instance = this.client.db(config.database);
  };

  getDb = () => this._instance;

  dbProjects = () => this._instance.collection(Constants.PROJECTS_COLLECTION);

  dbSamples = () => this._instance.collection(Constants.SAMPLES_COLLECTION);

  disconnect = async () => this.client.close();
}

// eslint-disable-next-line import/prefer-default-export
export const db = new Database();
