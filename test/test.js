import request from 'supertest';
import app from '../index.js';

describe('GET /api/v1/projects', () => {
  it('should return all projects', async () => {
    const res = await request(app)
      .get('/api/v1/projects')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.be.an('array');
  });
});

describe('GET /api/v1/projects/:id', () => {
  it('should return a single project', async () => {
    const projectId = 'your-project-id'; // Replace with a valid project ID
    const res = await request(app)
      .get(`/api/v1/projects/${projectId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.have.property('_id', projectId);
  });

  it('should return 404 for a non-existent project', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .get(`/api/v1/projects/${nonExistentId}`)
      .expect(404);
  });
});
