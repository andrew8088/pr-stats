const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;

function dropDatabase(dbName) {
  return new Promise((resolve) => {
    MongoClient.connect(process.env.MONGODB_CONNECTION_URL, function (
      err,
      client
    ) {
      assert.equal(null, err);
      const db = client.db(dbName);
      db.dropDatabase(function (err, result) {
        assert.equal(err, null);
        resolve(result);
        client.close();
      });
    });
  });
}

function writeToCollection(dbName, collName, docs) {
  return new Promise((resolve) => {
    MongoClient.connect(process.env.MONGODB_CONNECTION_URL, function (
      err,
      client
    ) {
      assert.equal(null, err);

      const db = client.db(dbName);
      const collection = db.collection(collName);

      collection.insertMany(docs, function (err, result) {
        assert.equal(err, null);
        assert.equal(docs.length, result.result.n);
        assert.equal(docs.length, result.ops.length);
        resolve(result);
        client.close();
      });
    });
  });
}

module.exports = {
  dropDatabase,
  writeToCollection,
};
