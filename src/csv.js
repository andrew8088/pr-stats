const path = require("path");
const { writeFile, readFile } = require("./util");
const { Parser } = require("json2csv");

const fields = [
  "number",
  "creator",
  "requested_reviewers",
  "reviewers",
  "state",
  "title",
  "created_at",
  "closed_at",
  "merged_at",
  "merged_by",
  "comments",
  "review_comments",
  "commits",
  "additions",
  "deletions",
  "changed_files",
  "head_label",
  "head_ref",
  "base_label",
  "base_ref",
];

async function convertToCsv(
  baseStoragePath,
  repo,
  fromFilename = "summary.json",
  toFilename = "summary.csv"
) {
  const storagePath = path.join(baseStoragePath, repo);
  try {
    const data = JSON.parse(
      await readFile(path.join(storagePath, fromFilename))
    );
    const parser = new Parser({ fields });
    const csv = parser.parse(flattenArrays(data));

    await writeFile(path.join(storagePath, toFilename), csv);
  } catch (err) {
    console.error(err);
  }
}

function flattenArrays(data) {
  return data.map((d) => ({
    ...d,
    requested_reviewers: d.requested_reviewers.join(","),
    reviewers: d.reviewers.join(","),
  }));
}

module.exports = {
  convertToCsv,
};
