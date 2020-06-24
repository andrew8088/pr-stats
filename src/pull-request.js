const fs = require("fs");
const path = require("path");
const util = require("util");
const R = require("ramda");
const { getPullRequest } = require("./github");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function storePullRequest(org, repo, prNumber, storagePath) {
  console.log("fetching", prNumber);
  const pr = await getPullRequest(org, repo, prNumber);
  await writePullRequest(storagePath, pr);
  return pr;
}

function transformPullRequest({ pullRequest, reviews }) {
  return {
    number: pullRequest.number,
    creator: pullRequest.user.login,
    requested_reviewers: pullRequest.requested_reviewers.map((u) => u.login),
    reviewers: [...new Set(reviews.map((r) => r.user.login))],
    state: pullRequest.state,
    title: pullRequest.title,
    created_at: pullRequest.created_at,
    closed_at: pullRequest.closed_at,
    merged_at: pullRequest.merged_at,
    merged_by: R.path(["merged_by", "login"], pullRequest),
    milestone: R.path(["milestone", "title"], pullRequest),
    comments: pullRequest.comments,
    review_comments: pullRequest.review_comments,
    commits: pullRequest.commits,
    additions: pullRequest.additions,
    deletions: pullRequest.deletions,
    changed_files: pullRequest.changed_files,
    head_label: pullRequest.head.label,
    head_ref: pullRequest.head.ref,
    base_label: pullRequest.base.label,
    base_ref: pullRequest.base.ref,
  };
}

function toPath(storagePath, number) {
  const filename = number.toString().padStart(4, "0") + ".json";
  return path.join(storagePath, filename);
}

function writePullRequest(storagePath, pr) {
  const { number } = pr.pullRequest;
  const filepath = toPath(storagePath, number);
  return writeFile(filepath, JSON.stringify(pr, null, "\t"));
}

async function readPullRequest(storagePath, number) {
  try {
    const buffer = await readFile(toPath(storagePath, number));
    return JSON.parse(buffer.toString());
  } catch (e) {
    return null;
  }
}

module.exports = {
  readPullRequest,
  writePullRequest,
  storePullRequest,
  transformPullRequest,
};
