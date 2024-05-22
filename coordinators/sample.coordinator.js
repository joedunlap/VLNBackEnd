/* eslint-disable no-console */
import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import SamplesModel from '../models/sample.model.js';
import SampleSchema from '../schemas/sample.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(SampleSchema);

export default class SamplesCoordinator {
  static async getSamples(projectId) {
    console.log(`\t Coordinator : getSamples(${projectId})`);
    return SamplesModel.getSamples(projectId);
  }

  static async createSample(projectId, newSample) {
    console.log('\t Coordinator : createSample()');
    const sample = {
      ...newSample, id: uuid(), projectId, createdAt: new Date(),
    };

    const valid = validate(sample);
    if (!valid) {
      throw validate.errors;
    }

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

  static async replaceSample(id, sample) {
    console.log(`\t Coordinator : replaceSample(${id})`);
    const replaceSample = { ...sample, id };

    const valid = validate(sample);
    if (!valid) {
      throw validate.errors;
    }


    return SamplesModel.replaceSample(id, replaceSample, replaceSample.projectId);
  }

  static async updateSample(id, sample) {
    console.log(`\t Coordinator : updateSample(${id})`);

    const valid = validate(sample);
    if (!valid) {
      throw validate.errors;
    }


    return SamplesModel.updateSample(id, sample);
  }
}