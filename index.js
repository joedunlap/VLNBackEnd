import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorHandler.js';
import projectRouter from './routes/project.routes.js';
import sampleRouter from './routes/sample.routes.js';
import { db } from './lib/database.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;
app.use(json());

// project routes
app.post('/api/v1/projects');
app.patch('/api/v1/projects/:id');
app.put('/api/v1/projects/:id');

app.use('/api/v1/projects', projectRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

// TODO: Environment based configs
const mongoConfig = config.get('mongo');
db.init(mongoConfig);

if (db.init(mongoConfig)) {
    console.log('Succesfully connect to MongoDb Database')
}

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});
