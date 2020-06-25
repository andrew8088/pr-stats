const fs = require("fs");
const util = require("util");
const moment = require("moment");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const dateFormat = "M/D/YYYY H:mm:ss";
const toDateString = (d) => moment(d).format(dateFormat);

module.exports = {
  readFile,
  writeFile,
  toDateString,
};
