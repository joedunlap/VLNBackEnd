import express from 'express';
import {
  getProjects,
  createProject,
  getProject,
  replaceProject,
  deleteProject,
  updateProject,
} from '../controllers/project.controller.js';
import sampleRoutes from './sample.routes.js';

const projectRouter = express.Router();

// GET /api/v1/projects
projectRouter.get('/', getProjects);

// Post /api/v1/projects
projectRouter.post('/', createProject);

projectRouter.get('/projects/:id', getProject);

// GET /api/v1/projects/<id>
projectRouter.get('/:id', getProject);

// PUT /api/v1/projects/<id>
projectRouter.put('/:id', replaceProject);

// DELETE /api/v1/projects/<id>
projectRouter.delete('/:id', deleteProject);

// PATCH /api/v1/projects/<id>
projectRouter.patch('/:id', updateProject);

projectRouter.use('/:projectId/samples', sampleRoutes);

export default projectRouter;
