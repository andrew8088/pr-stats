const fs = require("fs");
const util = require("util");
const { getPullRequest } = require("./github");

const writeFile = util.promisify(fs.writeFile);

async function storePullRequest(org, repo, prNumber, storagePath) {
  console.log("fetching", prNumber);
  const pr = await getPullRequest(org, repo, prNumber);
  await writePullRequest(storagePath, pr);
  return pr;
}

function writePullRequest(storagePath, pr) {
  const { number } = pr.pullRequest;
  const filepath =
    storagePath + "/" + number.toString().padStart(4, "0") + ".json";
  return writeFile(filepath, JSON.stringify(pr, null, "\t"));
}

module.exports = {
  writePullRequest,
  storePullRequest,
};
