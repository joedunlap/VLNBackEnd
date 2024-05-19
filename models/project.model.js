/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class ProjectsModel {
  static getProjects = async () => {
    console.log('\t\t Model : getProjects()');

    return db.dbProjects().find(
      {},
      { projection: Constants.DEFAULT_PROJECTION },
    ).toArray();
  };

  static createProject = async (newProject) => {
    console.log('\t\t Model : createProject()');
    await db.dbProjects().insertOne(newProject);

    const returnProject = { ...newProject };
    // eslint-disable-next-line no-underscore-dangle
    delete returnProject._id;
    return returnProject;
  };

  static getProject = (id) => {
    console.log('\t\t Model : getProject()');
    return db.dbProjects().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deleteProject = (id) => {
    console.log('\t\t Model : deleteProject()');

    return db.dbProjects().deleteOne({ id });
  };

  static replaceProject = async (id, project) => {
    const result = await db.dbProjects().replaceOne({ id }, project);

    if (result.matchedCount === 1) {
      return project;
    }

    return false;
  };

  static updateProject = async (id, project) => {
    const update = {
      $set: {},
    };

    Object.keys(project).forEach((key) => {
      if (key === 'id') {
        return;
      }

      update.$set[key] = project[key];
    });

    const result = await db.dbProjects().findOneAndUpdate({ id }, update, { returnDocument: 'after' });

    if (result) {
      // eslint-disable-next-line no-underscore-dangle
      delete result._id;
      return result;
    }

    return false;
  };
}
