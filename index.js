const { fetch } = require("./src/main-fetch");
const { transform } = require("./src/main-transform");
const { convertToCsv } = require("./src/csv");

const STORAGE_PATH = process.argv[2];
const ORG = process.argv[3];
const REPO = process.argv[4];

(async function () {
  console.log(`fetching ${ORG}/${REPO}`);
  await fetch(ORG, REPO, STORAGE_PATH, "prrc");
  console.log(`transforming ${ORG}/${REPO}`);
  await transform(STORAGE_PATH, REPO);

  console.log(`converting to CSV ${ORG}/${REPO}`);
  await convertToCsv(STORAGE_PATH, REPO);
})();
