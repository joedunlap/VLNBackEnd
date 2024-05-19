/* eslint-disable import/extensions */
import express from 'express';
import {
  getSamples,
  createSample,
  getSample,
  deleteSample,
  replaceSample,
  updateSample,
} from '../controllers/sample.controller.js';

const sampleRouter = express.Router({ mergeParams: true });

sampleRouter.get('/', getSamples);
sampleRouter.post('/', createSample);
sampleRouter.get('/:id', getSample);
sampleRouter.delete('/:id', deleteSample);
sampleRouter.put('/:id', replaceSample);
sampleRouter.patch('/:id', updateSample);

export default sampleRouter;
