/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';
import config from 'config'; // Import the config package
// eslint-disable-next-line import/extensions
import Constants from './constants.js';

class Database {
  _instance = null;

  client = null;

  // config has all DB settings
  // TODO: Add connection pool
  init = async () => {
    const dbConfig = config.get('mongo'); // Load the configuration
    // eslint-disable-next-line no-console
    console.log('Database configuration:', dbConfig); // Add this line to log the config
    this.client = new MongoClient(dbConfig.url, {
      minPoolSize: dbConfig.minPoolSize,
      maxPoolSize: dbConfig.maxPoolSize,
    });
    await this.client.connect();
    this._instance = this.client.db(dbConfig.database);
  };

  getDb = () => this._instance;

  dbProjects = () => this._instance.collection(Constants.PROJECTS_COLLECTION);

  dbSamples = () => this._instance.collection(Constants.SAMPLES_COLLECTION);

  disconnect = async () => this.client.close();
}

// eslint-disable-next-line import/prefer-default-export
export const db = new Database();
