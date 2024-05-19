// test/sample.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Adjust the path to your app's entry point

const { expect } = chai;
chai.use(chaiHttp);

describe('Sample CRUD Tests', () => {
  let projectId;
  let sampleId;

  // Create a project before running tests
  before((done) => {
    chai.request(app)
      .post('/api/v1/projects')
      .send({ name: 'Test Project', description: 'Description of the Test Project' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        projectId = res.body.id;
        done();
      });
  });

  // Test creating a sample
  it('should create a sample', (done) => {
    chai.request(app)
      .post(`/api/v1/projects/${projectId}/samples`)
      .send({ name: 'Test Sample', description: 'Description of the Test Sample' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        sampleId = res.body.id;
        done();
      });
  });

  // Test getting all samples for a project
  it('should get all samples for a project', (done) => {
    chai.request(app)
      .get(`/api/v1/projects/${projectId}/samples`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test getting a specific sample
  it('should get a specific sample', (done) => {
    chai.request(app)
      .get(`/api/v1/projects/${projectId}/samples/${sampleId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id', sampleId);
        done();
      });
  });

  // Test updating a sample
  it('should update a sample', (done) => {
    chai.request(app)
      .patch(`/api/v1/projects/${projectId}/samples/${sampleId}`)
      .send({ name: 'Updated Test Sample', description: 'Updated description of the Test Sample' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name', 'Updated Test Sample');
        done();
      });
  });

  // Test replacing a sample
  it('should replace a sample', (done) => {
    chai.request(app)
      .put(`/api/v1/projects/${projectId}/samples/${sampleId}`)
      .send({ name: 'Replaced Test Sample', description: 'Replaced description of the Test Sample' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name', 'Replaced Test Sample');
        done();
      });
  });

  // Test deleting a sample
  it('should delete a sample', (done) => {
    chai.request(app)
      .delete(`/api/v1/projects/${projectId}/samples/${sampleId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});