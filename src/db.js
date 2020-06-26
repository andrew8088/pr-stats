const { Sequelize, Model, DataTypes } = require("sequelize");

async function getModels() {
  const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_URI);
  class PullRequest extends Model {}
  PullRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      url: DataTypes.TEXT,
      number: DataTypes.INTEGER,
      creator: DataTypes.TEXT,
      state: DataTypes.TEXT,
      title: DataTypes.TEXT,
      body: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      closed_at: DataTypes.DATE,
      merged_at: DataTypes.DATE,
      comment_count: DataTypes.INTEGER,
      review_comment_count: DataTypes.INTEGER,
      commits: DataTypes.INTEGER,
      addition: DataTypes.INTEGER,
      deletions: DataTypes.INTEGER,
      changed_files: DataTypes.INTEGER,
      repo: DataTypes.TEXT,
      assignees: DataTypes.TEXT,
      requested_reviewers: DataTypes.TEXT,
      merged_by: DataTypes.TEXT,
      milestone: DataTypes.TEXT,
      head_label: DataTypes.TEXT,
      head_ref: DataTypes.TEXT,
      base_label: DataTypes.TEXT,
      base_ref: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "pull_request",
      tabelName: "pull_requests",
    }
  );

  class Review extends Model {}
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      pull_request_id: DataTypes.INTEGER,
      reviewer: DataTypes.TEXT,
      body: DataTypes.TEXT,
      state: DataTypes.TEXT,
      submitted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "review",
      tabelName: "reviews",
    }
  );

  class Comment extends Model {}
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      pull_request_id: DataTypes.INTEGER,
      pull_request_review_id: DataTypes.INTEGER,
      commentor: DataTypes.TEXT,
      body: DataTypes.TEXT,
      diff_hunk: DataTypes.TEXT,
      path: DataTypes.TEXT,
      position: DataTypes.INTEGER,
      original_position: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "comment",
      tabelName: "comments",
    }
  );
  await sequelize.sync();

  return {
    PullRequest,
    Review,
    Comment,
  };
}

module.exports = {
  getModels,
};
