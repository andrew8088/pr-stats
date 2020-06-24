const { fetch } = require("./src/main-fetch");
const { transform } = require("./src/main-transform");

const STORAGE_PATH = process.argv[2];
const ORG = process.argv[3];
const REPO = process.argv[4];

(async function () {
  console.log(`fetching ${ORG}/${REPO}`);
  await fetch(ORG, REPO, STORAGE_PATH, "prrc");
  console.log(`transforming ${ORG}/${REPO}`);
  return transform(STORAGE_PATH, REPO);
})();
