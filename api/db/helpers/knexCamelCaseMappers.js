const { camelCase, snakeCase } = require('lodash');
const Client = require('knex/lib/dialects/postgres');

const convertToCamel = result => Object.keys(result).reduce((acc, key) => {
  const value = result[key];
  acc[camelCase(key)] = value;
  return acc;
}, {});

const replacePrefixMv2Mv3 = (value) => {
  const newStr = value.replace(/mv_2/gi, 'mv2');
  let finalStr = newStr.replace(/mv_3/gi, 'mv3');
  if (finalStr === 'manager_langue_1_c') finalStr = 'manager_langue1_c';
  if (finalStr === 'manager_langue_2_c') finalStr = 'manager_langue2_c';
  if (finalStr === 'manager_langue_3_c') finalStr = 'manager_langue3_c';
  if (finalStr === 'manager_langue_4_c') finalStr = 'manager_langue4_c';
  if (finalStr === 'manager_niveau_langue_1_c') finalStr = 'manager_niveau_langue1_c';
  if (finalStr === 'manager_niveau_langue_2_c') finalStr = 'manager_niveau_langue2_c';
  if (finalStr === 'manager_niveau_langue_3_c') finalStr = 'manager_niveau_langue3_c';
  if (finalStr === 'manager_niveau_langue_4_c') finalStr = 'manager_niveau_langue4_c';
  if (finalStr === 'mv2_secteur_activite_affine_2_c') finalStr = 'mv2_secteur_activite_affine2_c';
  if (finalStr === 'mv2_secteur_activite_affine_3_c') finalStr = 'mv2_secteur_activite_affine3_c';

  if (finalStr === 'phone') finalStr = 'phone_work';

  return finalStr;
};

const convertToSnakeAndReplace = result => Object.keys(result).reduce((acc, key) => {
  const value = result[key];
  const newKey = replacePrefixMv2Mv3(snakeCase(key));
  acc[newKey] = value;
  return acc;
}, {});

const knexCamelCaseMappers = () => ({
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      return result.map(row => convertToCamel(row));
    }
    if (typeof result === 'object') {
      return convertToCamel(result);
    }

    return result;
  },
  wrapIdentifier: (value, origImpl) => {
    if (value === '*') return value;
    const matched = value.match(/(.*?)(\[[0-9]\])/);
    if (matched) {
      return Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2];
    }
    return origImpl(snakeCase(value));
  },
});

module.exports = {
  knexCamelCaseMappers,
  convertToCamel,
  convertToSnakeAndReplace,
};
