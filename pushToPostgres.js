const R = require("ramda");
const fs = require("fs");
const path = require("path");
const { toPath } = require("./src/pull-request");
const { getModels, upsertById } = require("./src/db");
const { transformToTableCsv } = require("./src/transformers");

const STORAGE_PATH = process.argv[2];
const REPO = process.argv[3];

(async function () {
  const { PullRequest, Review, Comment, sequelize } = await getModels();

  await pushRepoToDb(STORAGE_PATH, REPO, 1, 2000, {
    PullRequest,
    Review,
    Comment,
  });

  await sequelize.close();
})();

// --- HELPERS

async function pushRepoToDb(baseDir, repo, start, end, models) {
  const { prs, reviews, comments } = toModels(baseDir, repo, start, end);

  for (const pr of prs) {
    await upsertById(models.PullRequest, pr.id, pr);
  }

  for (const review of reviews) {
    await upsertById(models.Review, review.id, review);
  }

  for (const comment of comments) {
    await upsertById(models.Comment, comment.id, comment);
  }
}

function* allPaths(baseDir, start, end) {
  for (let i = start; i <= end; i++) {
    yield toPath(baseDir, i);
  }
}

function loadPr(path) {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path).toString());
  }
  return null;
}

function toModels(baseDir, repo, start, end) {
  let data = [...allPaths(path.join(baseDir, repo), start, end)]
    .map(loadPr)
    .filter(R.identity)
    .map((pr) => transformToTableCsv(repo, pr));

  return {
    prs: data.map(R.prop("pr")),
    reviews: R.flatten(data.map(R.prop("reviews"))),
    comments: R.flatten(data.map(R.prop("comments"))),
  };
}
