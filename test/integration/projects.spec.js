import axios from 'axios';
import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { expect } from 'chai';
import { db } from '../../lib/database.js';
import projectRouter from '../../routes/project.routes.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { projectsData } from './test-data/projects-data.js';
import errorMiddleware from '../../middleware/errorHandler.js';

describe('Projects', () => {
  const url = 'http://127.0.0.1:3001/api/v1/projects';
  let server;
  let mongod;

  before(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/api/v1/projects', projectRouter);
    app.use(errorMiddleware());
    server = app.listen(3001, () => {
      console.log(`Starting express application on port 3001 @ ${new Date().toISOString()}`);
    });

    const mongoConfig = config.get('mongo');
    mongod = new MongoMemoryServer({
      instance: {
        port: 27018,
        dbName: mongoConfig.database,
      },
    });
    await mongod.start();
    await db.init(mongoConfig);
  });

  beforeEach(async () => {
    await db.dbProjects().insertMany(projectsData);
  });

  afterEach(async () => {
    await db.dbProjects().deleteMany({});
  });

  after(async () => {
    await db.disconnect();
    await mongod.stop();
    server.close();
  });

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      const result = (await axios.get(url)).data;
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(3);
    });

    it('should a single project by id', async () => {
      const result = (await axios.get(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`)).data;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('briefdescription');
      expect(result).to.have.property('category');

      expect(result.name).to.equal('Project #1');
      expect(result.briefdescription).to.equal('test');
      expect(result.category).to.equal('Other');
    });

    it('should create a new project', async () => {
      const newProject = {
        name: 'Project-Test',
        briefdescription: 'test',
        category: 'Other',
      };

      const result = (await axios.post(url, newProject)).data;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('briefdescription');
      expect(result).to.have.property('category');

      expect(result.name).to.equal('Project-Test');
      expect(result.briefdescription).to.equal('test');
      expect(result.category).to.equal('Other');

      const getResult = (await axios.get(`${url}/${result.id}`)).data;
      expect(getResult).to.be.an('object');
      expect(getResult).to.have.property('id');
      expect(getResult).to.have.property('name');
      expect(result).to.have.property('briefdescription');
      expect(result).to.have.property('category');

      expect(result.name).to.equal('Project-Test');
      expect(result.briefdescription).to.equal('test');
      expect(result.category).to.equal('Other');
    });

    it('should update a single project by id', async () => {
      const updateData = {
        id: '49b73c5f-9007-4828-a0cd-da38aacc1219',
        name: 'Project-UPDATED',
        briefdescription: 'Updated Test',
        category: 'Botany',
      };
      const result = (await axios.patch(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`, updateData)).data;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('briefdescription');
      expect(result).to.have.property('category');


      expect(result.id).to.equal('49b73c5f-9007-4828-a0cd-da38aacc1219');
      expect(result.name).to.equal('Project-UPDATED');
      expect(result.briefdescription).to.equal('Updated Test');
      expect(result.category).to.equal('Botany');

      const getResult = (await axios.get(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`)).data;
      expect(getResult).to.be.an('object');
      expect(getResult).to.have.property('id');
      expect(getResult).to.have.property('name');
      expect(result).to.have.property('briefdescription');
      expect(result).to.have.property('category');

      expect(getResult.id).to.equal('49b73c5f-9007-4828-a0cd-da38aacc1219');
      expect(result.name).to.equal('Project-UPDATED');
      expect(result.briefdescription).to.equal('Updated Test');
      expect(result.category).to.equal('Botany');
    });

    it('should delete a single project by id', async () => {
      const result = (await axios.delete(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`));
      expect(result.status).to.equal(204);

      try {
        (await axios.get(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`));
      } catch (ex) {
        expect(ex.response.status).to.equal(404);
      }
    });

    it('should fail validation when updating a single project by id', async () => {
      const updateData = {
        briefdescription: 'TEST TEST',
        category: 'Microbiology',
        id: '49b73c5f-9007-4828-a0cd-da38aacc1219',
      };

      try {
        (await axios.patch(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`, updateData));
      } catch (ex) {
        expect(ex.response.status).to.equal(400);
        expect(ex.response.data).to.have.property('error');
        expect(ex.response.data.error).to.be.an('array');
        expect(ex.response.data.error).to.have.lengthOf(1);
        expect(ex.response.data.error[0]).to.have.property('message');
        expect(ex.response.data.error[0].message).to.equal('must have required property \'name\'');
      }
    });
  });
});
