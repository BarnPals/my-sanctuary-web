// Dependencies
const map = require('lodash/map');
const join = require('lodash/join');
// Relative imports.
const ENVS = require('./ENVS');

const deriveEnvVars = (env = 'dev') => {
  // Derive the envVars object.
  const envVarsLookup = ENVS[env];

  // Escape early if we were unable to find the env.
  if (!envVarsLookup) {
    return [];
  }

  // Convert the object to an array of strings. ["key=value", "key1=value1", ...]
  const envVarsList = map(envVarsLookup, (value, key) => `${key}=${value}`);

  // Convert the array to a string. "key=value key1=value1 ..."
  return join(envVarsList, ' ');
};

module.exports = deriveEnvVars;
