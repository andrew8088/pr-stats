const { Sequelize, Model, DataTypes } = require("sequelize");

async function getModels() {
  const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_URI, {
    logging: false,
  });
  class PullRequest extends Model {}
  PullRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      repo: DataTypes.TEXT,
      number: DataTypes.INTEGER,
      creator: DataTypes.TEXT,
      state: DataTypes.TEXT,
      title: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      closed_at: DataTypes.DATE,
      merged_at: DataTypes.DATE,
      merged_by: DataTypes.TEXT,
      comment_count: DataTypes.INTEGER,
      review_comment_count: DataTypes.INTEGER,
      commits: DataTypes.INTEGER,
      additions: DataTypes.INTEGER,
      deletions: DataTypes.INTEGER,
      changed_files: DataTypes.INTEGER,
      assignees: DataTypes.JSONB,
      requested_reviewers: DataTypes.JSONB,
      milestone: DataTypes.TEXT,
      body: DataTypes.TEXT,
      url: DataTypes.TEXT,
      head_label: DataTypes.TEXT,
      head_ref: DataTypes.TEXT,
      base_label: DataTypes.TEXT,
      base_ref: DataTypes.TEXT,
    },
    {
      sequelize,
      timestamps: false,
      tableName: "pull_requests",
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
      tableName: "reviews",
      timestamps: false,
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
      timestamps: false,
      tableName: "comments",
    }
  );
  await sequelize.sync();

  return {
    PullRequest,
    Review,
    Comment,
    sequelize,
  };
}

function upsertById(model, id, values) {
  return model.findByPk(id).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return model.create(values);
  });
}

module.exports = {
  getModels,
  upsertById,
};
