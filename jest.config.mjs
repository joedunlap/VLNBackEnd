export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.mjs$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
    extensionsToTreatAsEsm: ['.mjs'],
  };