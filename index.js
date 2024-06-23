/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from './middleware/errorHandler.js';
import projectRouter from './routes/project.routes.js';
import sampleRouter from './routes/sample.routes.js';
import { db } from './lib/database.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const { json } = bodyParser;

// This is my express application
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.use(cors());
// project routes
app.post('/api/v1/projects');
app.patch('/api/v1/projects/:id');
app.put('/api/v1/projects/:id');

app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/samples', sampleRouter);

// Error middleware MUST be last
app.use(errorMiddleware);

// TODO: Environment based configs
const mongoConfig = {
  url: process.env.MONGO_URL || config.get('mongo.url'),
  database: process.env.MONGO_DB || config.get('mongo.database'),
  minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE, 10) || config.get('mongo.minPoolSize'),
  maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE, 10) || config.get('mongo.maxPoolSize')
};

db.init(mongoConfig)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(port, () => {
      console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });

export default app;