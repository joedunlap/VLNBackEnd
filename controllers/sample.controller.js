/* eslint-disable no-console */
import SamplesCoordinator from '../coordinators/sample.coordinator.js';

export const getSamples = async (req, res, next) => {
  console.log(`Controller : getSamples(${req.params.projectId})`);
  try {
    const result = await SamplesCoordinator.getSamples(req.params.projectId);
    res.status(200).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const createSample = async (req, res, next) => {
  console.log(`Controller : createSample(${req.params.projectId})`);
  try {
    const result = await SamplesCoordinator.createSample(req.params.projectId, req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const getSample = async (req, res, next) => {
  console.log(`Controller : getSample(${req.params.id})`);
  try {
    const result = await SamplesCoordinator.getSample(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Sample not found' });
    }
  } catch (ex) {
    next(ex);
  }
};

export const deleteSample = async (req, res, next) => {
  console.log(`Controller : deleteSample(${req.params.id})`);
  try {
    await SamplesCoordinator.deleteSample(req.params.id);
    res.status(204).json();
  } catch (ex) {
    next(ex);
  }
};

export const replaceSample = async (req, res, next) => {
  console.log(`Controller : replaceSample(${req.params.id})`);
  try {
    const result = await SamplesCoordinator.replaceSample(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Sample not found' });
    }
  } catch (ex) {
    next(ex);
  }
};

export const updateSample = async (req, res, next) => {
  console.log(`Controller : updateSample(${req.params.id})`);
  try {
    const result = await SamplesCoordinator.updateSample(req.params.id, req.body);
    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Sample not found' });
    }
  } catch (ex) {
    next(ex);
  }
};
