/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class ProjectsModel {
  static async getProjects() {
    console.log('\t\t Model : getProjects()');
    const projects = await db.dbProjects().find({}, { projection: Constants.DEFAULT_PROJECTION }).toArray();

    // Use Promise.all to fetch samples for each project concurrently
    const projectsWithSamples = await Promise.all(projects.map(async (project) => {
      const samples = await db.dbSamples().find({ projectId: project.id }, { projection: Constants.DEFAULT_PROJECTION }).toArray();
      return { ...project, samples };
    }));

    return projectsWithSamples;
  }

  static async createProject(newProject) {
    console.log('\t\t Model : createProject()');
    await db.dbProjects().insertOne(newProject);
    const returnProject = { ...newProject };
    delete returnProject._id; // eslint-disable-next-line no-underscore-dangle
    return returnProject;
  }

  static async getProject(id) {
    console.log('\t\t Model : getProject()');
    const project = await db.dbProjects().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
    if (project) {
      const samples = await db.dbSamples().find({ projectId: id }, { projection: Constants.DEFAULT_PROJECTION }).toArray();
      project.samples = samples;
    }
    return project;
  }

  static async deleteProject(id) {
    console.log('\t\t Model : deleteProject()');
    return db.dbProjects().deleteOne({ id });
  }

  static async replaceProject(id, project) {
    console.log('\t\t Model : replaceProject()');
    const result = await db.dbProjects().replaceOne({ id }, project);
    if (result.matchedCount === 1) {
      return project;
    }
    return false;
  }

  static async updateProject(id, project) {
    console.log('\t\t Model : updateProject()');
    const update = { $set: {} };
    Object.keys(project).forEach((key) => {
      if (key === 'id') return;
      update.$set[key] = project[key];
    });
    const result = await db.dbProjects().findOneAndUpdate({ id }, update, { returnDocument: 'after' });
    if (result) {
      delete result._id; // eslint-disable-next-line no-underscore-dangle
      return result;
    }
    return false;
  }
}