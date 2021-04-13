const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

module.exports = () =>
  open({
    filename: "./database.sqLite",
    driver: sqlite3.Database,
  });
