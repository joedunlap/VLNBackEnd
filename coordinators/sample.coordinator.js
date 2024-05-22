/* eslint-disable no-console */
import { v4 as uuid } from 'uuid';
import SamplesModel from '../models/sample.model.js';

export default class SamplesCoordinator {
  static async getSamples(projectId) {
    console.log(`\t Coordinator : getSamples(${projectId})`);
    return SamplesModel.getSamples(projectId);
  }

  static async createSample(projectId, newSample) {
    console.log('\t Coordinator : createSample()');
    const sample = { ...newSample, id: uuid(), projectId, createdAt: new Date() };
    return SamplesModel.createSample(sample);
  }

  static async getSample(id) {
    console.log(`\t Coordinator : getSample(${id})`);
    return SamplesModel.getSample(id);
  }

  static async deleteSample(id) {
    console.log(`\t Coordinator : deleteSample(${id})`);
    return SamplesModel.deleteSample(id);
  }

  static async replaceSample(id, sample, projectId) {
    console.log(`\t Coordinator : replaceSample(${id})`);
    const replaceSample = { ...sample, id, projectId };
    return SamplesModel.replaceSample(id, replaceSample);
  }

  static async updateSample(id, sample) {
    console.log(`\t Coordinator : updateSample(${id})`);
    return SamplesModel.updateSample(id, sample);
  }
}