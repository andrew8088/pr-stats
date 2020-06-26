const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "andrew8088/pr-stats",
});

async function getPullRequest(owner, repo, pull_number) {
  const { data: pullRequest } = await octokit.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const { data: reviews } = await octokit.pulls.listReviews({
    owner,
    repo,
    pull_number,
  });

  for (let r of reviews) {
    const { data: review_comments } = await octokit.pulls.listCommentsForReview(
      {
        owner,
        repo,
        pull_number,
        review_id: r.id,
      }
    );

    r.comments = review_comments;
  }

  return {
    pullRequest,
    reviews,
  };
}

async function getLastPrCreated(owner, repo) {
  const r = await octokit.pulls.list({
    owner,
    repo,
    sort: "created",
    direction: "desc",
    per_page: 1,
    page: 1,
    state: "all",
  });
  return r.data[0].number;
}

module.exports = {
  getLastPrCreated,
  getPullRequest,
};
