const path = require("path");
const { writeFile, readFile, toDateString } = require("./util");
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
    const csv = parser.parse(transformForCsv(data));

    await writeFile(path.join(storagePath, toFilename), csv);
  } catch (err) {
    console.error(err);
  }
}

function transformForCsv(data) {
  return data.map((d) => ({
    ...d,
    requested_reviewers: d.requested_reviewers.join(","),
    reviewers: d.reviewers.join(","),
    created_at: toDateString(d.created_at),
    closed_at: d.closed_at ? toDateString(d.closed_at) : "",
    merged_at: d.merged_at ? toDateString(d.merged_at) : "",
  }));
}

module.exports = {
  convertToCsv,
};
