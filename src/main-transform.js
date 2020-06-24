const path = require("path");
const { writeFile } = require("./util");
const { readPullRequest, transformPullRequest } = require("./pull-request");

async function transform(
  baseStoragePath,
  repo,
  summaryFilename = "summary.json"
) {
  const storagePath = path.join(baseStoragePath, repo);
  const summarizedData = [];
  let number = 1;
  let pr;

  while ((pr = await readPullRequest(storagePath, number++))) {
    summarizedData.push(transformPullRequest(pr));
  }

  await writeFile(
    path.join(storagePath, summaryFilename),
    JSON.stringify(summarizedData, null, "\t")
  );
}

module.exports = {
  transform,
};
