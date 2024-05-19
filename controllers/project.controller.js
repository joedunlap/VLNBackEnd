/* eslint-disable no-console */
import ProjectsCoordinator from '../coordinators/project.coordinator.js';

export const getProjects = async (req, res, next) => {
  console.log('Controller : getProjects()');

  try {
    const result = await ProjectsCoordinator.getProjects();
    res.status(200).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const createProject = async (req, res, next) => {
  console.log('Controller : createProject()');

  try {
    const result = await ProjectsCoordinator.createProject(req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const getProject = async (req, res, next) => {
  console.log(`Controller : getProject(${req.params.id})`);

  try {
    const result = await ProjectsCoordinator.getProject(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const deleteProject = async (req, res, next) => {
  console.log(`Controller : deleteProject(${req.params.id})`);

  try {
    await ProjectsCoordinator.deleteProject(req.params.id);
    res.status(204).json();
  } catch (ex) {
    next(ex);
  }
};

export const replaceProject = async (req, res, next) => {
  console.log(`Controller : replaceProject(${req.params.id})`);

  try {
    const result = await ProjectsCoordinator.replaceProject(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const updateProject = async (req, res, next) => {
  console.log(`Controller : updateProject(${req.params.id})`);

  try {
    const result = await ProjectsCoordinator.updateProject(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};
