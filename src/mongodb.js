const assert = require("assert");
const MongoClient = require("mongodb").MongoClient;

function writeToCollection(collName, docs) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGODB_CONNECTION_URL, function (
      err,
      client
    ) {
      assert.equal(null, err);

      const db = client.db("pull_request_data");
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
  writeToCollection,
};
