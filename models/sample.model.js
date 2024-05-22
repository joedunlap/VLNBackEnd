/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class SamplesModel {
  static async getSamples(projectId) {
    console.log('\t\t Model : getSamples()');
    return db.dbSamples().find({ projectId }, { projection: Constants.DEFAULT_PROJECTION }).toArray();
  }

  static async createSample(newSample) {
    console.log('\t\t Model : createSample()');
    await db.dbSamples().insertOne(newSample);
    const returnSample = { ...newSample };
    delete returnSample._id; // eslint-disable-next-line no-underscore-dangle
    return returnSample;
  }

  static async getSample(id) {
    console.log('\t\t Model : getSample()');
    return db.dbSamples().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  }

  static async deleteSample(id) {
    console.log('\t\t Model : deleteSample()');
    return db.dbSamples().deleteOne({ id });
  }

  static async replaceSample(id, sample) {
    console.log('\t\t Model : replaceSample()');
    const result = await db.dbSamples().replaceOne({ id }, sample);
    if (result.matchedCount === 1) {
      return sample;
    }
    return false;
  }

  static async updateSample(id, sample) {
    console.log('\t\t Model : updateSample()');
    const update = { $set: {} };
    Object.keys(sample).forEach((key) => {
      if (key === 'id') return;
      update.$set[key] = sample[key];
    });
    const result = await db.dbSamples().findOneAndUpdate({ id }, update, { returnDocument: 'after' });
    if (result) {
      delete result._id; // eslint-disable-next-line no-underscore-dangle
      return result;
    }
    return false;
  }
}
