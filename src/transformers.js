const R = require("ramda");

const name = R.prop("login");

function transformToTableCsv(repo, { pullRequest, reviews: rs }) {
  const pr = transformPullRequest(repo, pullRequest);
  const reviews = rs.map((r) => transformReview(r, pullRequest.id));
  const comments = R.flatten(rs.map((r) => r.comments)).map((c) =>
    transformComment(c, pullRequest.id)
  );

  return {
    pr,
    reviews,
    comments,
  };
}

function transformPullRequest(repo, pullRequest) {
  return {
    repo,
    creator: name(pullRequest.user),
    ...R.pick(
      [
        "url",
        "id",
        "number",
        "state",
        "title",
        "body",
        "created_at",
        "updated_at",
        "closed_at",
        "merged_at",
        "comments",
        "review_comments",
        "commits",
        "additions",
        "deletions",
        "changed_file",
      ],
      pullRequest
    ),
    assignees: pullRequest.assignees.map(name),
    requested_reviewers: pullRequest.requested_reviewers.map(name),
    merged_by: R.path(["merged_by", "login"], pullRequest),
    milestone: R.path(["milestone", "title"], pullRequest),
    head_label: pullRequest.head.label,
    head_ref: pullRequest.head.ref,
    base_label: pullRequest.base.label,
    base_ref: pullRequest.base.ref,
  };
}

function transformReview(r, pull_request_id) {
  return {
    reviewer: name(r.user),
    ...R.pick(["id", "body", "state", "submitted_at"], r),
    pull_request_id,
  };
}

function transformComment(c, pull_request_id) {
  return {
    commentor: name(c.user),
    pull_request_id,
    ...R.pick(
      [
        "id",
        "pull_request_review_id",
        "created_at",
        "updated_at",
        "body",
        "diff_hunk",
        "path",
        "position",
        "origial_position",
      ],
      c
    ),
  };
}

module.exports = {
  transformToTableCsv,
  transformPullRequest,
  transformReview,
  transformComment,
};
