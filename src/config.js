const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function readConfig(configPath) {
  try {
    return JSON.parse(await readFile(configPath));
  } catch (e) {
    return {};
  }
}

function writeConfig(configPath, content) {
  console.log(content);
  return writeFile(configPath, JSON.stringify(content));
}

function formatConfig(config, nextPr, pr) {
  const {
    pullRequest: { state, number },
  } = pr;

  const openPrs = config.openPrs || [];

  if (state === "open") {
    openPrs.push(number);
  }

  return { ...config, openPrs, lastPrFetched: nextPr };
}

module.exports = {
  readConfig,
  writeConfig,
  formatConfig,
};
