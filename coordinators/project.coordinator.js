import { customAlphabet } from 'nanoid'
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ProjectsModel from '../models/project.model';
import ProjectSchema from '../schemas/project.json' assert { type: 'json' };

const nanoid = customAlphabet('1234567890abcdef', 10)

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(ProjectSchemaSchema);


export default class WidgetsCoordinator {
 
  static getProjects = () => {
    console.log('\t Coordinator : getWidgets()');
    return ProjectsModel.getProjects();
  };

  static createProject = (newProject) => {
    console.log('\t Coordinator : createProject()');

    const widget = {
      ...newProject,
      id: nanoid(),
      createdAt: new Date()
    };

    const valid = validate(Project);
    if (!valid) {
      throw validate.errors;
    }

    return ProjectsModel.createProject(project);
  };

  static getProject = (id) => {
    console.log('\t Coordinator : getProject()');
    return ProjectsModel.getProject(id);
  };

  static deleteProject = (id) => {
    console.log('\t Coordinator : deleteProject()');
    return ProjectsModel.deleteProject(id);
  };

  static replaceProject = (id, project) => {
    console.log('\t Coordinator : replaceProject()');
    const replaceProject = {
      ...project,
      id,
    };

    const valid = validate(project);
    if (!valid) {
      throw validate.errors;
    }

    return ProjectsModel.replaceProject(id, replaceProject);
  };

  static updateProject = (id, project) => {
    console.log('\t Coordinator : updateProject()');

    const valid = validate(project);
    if (!valid) {
      throw validate.errors;
    }

    return ProjectsModel.updateProject(id, project);
  };

}