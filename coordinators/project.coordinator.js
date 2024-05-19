import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ProjectsModel from '../models/project.model.js';
import ProjectSchema from '../schemas/project.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(ProjectSchema);

export default class ProjectsCoordinator {
  static getProjects = () => {
    console.log('\t Coordinator : getProjects()');
    return ProjectsModel.getProjects();
  };

  static createProject = (newProject) => {
    console.log('\t Coordinator : createProject()');

    const project = {
      ...newProject,
      id: uuid(),
      createdAt: new Date(),
    };

    const valid = validate(project);
    if (!valid) {
      throw validate.errors;
    }

    return ProjectsModel.createProject(project);
  };

  static getProject = (id) => {
    console.log(`\t Coordinator : getProject(${id})`);
    return ProjectsModel.getProject(id);
  };

  static deleteProject = (id) => {
    console.log(`\t Coordinator : deleteProject(${id})`);
    return ProjectsModel.deleteProject(id);
  };

  static replaceProject = (id, project) => {
    console.log(`\t Coordinator : replaceProject(${id})`);
    const replaceProject = {
      ...project,
      id,
    };

    const valid = validate(replaceProject);
    if (!valid) {
      throw validate.errors;
    }

    return ProjectsModel.replaceProject(id, replaceProject);
  };

  static updateProject = (id, project) => {
    console.log(`\t Coordinator : updateProject(${id})`);

    const valid = validate(project);
    if (!valid) {
      throw validate.errors;
    }

    return ProjectsModel.updateProject(id, project);
  };
}