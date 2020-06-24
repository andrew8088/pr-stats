const path = require("path");
const { readConfig, writeConfig, formatConfig } = require("./config");
const { getLastPrCreated } = require("./github");
const { storePullRequest } = require("./pull-request");

async function main(org, repo, baseStoragePath, configFilename) {
  const storagePath = path.join(baseStoragePath, repo);
  const configPath = path.join(storagePath, configFilename);

  let config = await readConfig(configPath);

  // update open pull requests
  for (let openPrNumber of config.openPrs || []) {
    await storePullRequest(org, repo, openPrNumber, storagePath);

    config.openPrs = config.openPrs.filter((x) => x !== openPrNumber);
    await writeConfig(configPath, config);
  }

  // get latest pull requests
  const lastPrFetched = config.lastPrFetched || 0;
  const lastPrCreated = await getLastPrCreated(org, repo);

  let nextPr = lastPrFetched + 1;

  while (nextPr <= lastPrCreated) {
    const pr = await storePullRequest(org, repo, nextPr, storagePath);
    config = formatConfig(config, nextPr, pr);
    await writeConfig(configPath, config);
    nextPr++;
  }
}

module.exports = { main };
