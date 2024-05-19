import express from 'express';
import {
  getProjects,
  createProject,
  getProject,
  replaceProject,
  deleteProject,
  updateProject,
} from '../controllers/project.controller';

const projectRouter = express.Router();

// GET /api/v1/projects
projectRouter.get('/', getProjects);

// Post /api/v1/projects
projectRouter.post('/', createProject);

// GET /api/v1/projects/<id>
projectRouter.put('/:id', getProject);

// PUT /api/v1/widgets/<id>
projectRouter.put('/:id', replaceProject);

// DELETE /api/v1/widgets/<id>
projectRouter.delete('/:id', deleteProject);

// PATCH /api/v1/projects/<id>
projectRouter.patch('/:id', updateProject);

export default projectRouter;
