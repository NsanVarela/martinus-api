const fs = require('fs');

const loadEnvVariables = () => {
  const filePathConfig = `${process.cwd()}/config.json`;
  if (!fs.existsSync(filePathConfig)) return;

  let config = fs.readFileSync(filePathConfig, { encoding: 'utf8' });
  config = JSON.parse(config);
  process.env = { ...process.env, ...config };
};

module.exports = loadEnvVariables;
