"use strict";

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet, (err, tweet) => {
        callback(null, true);
      });
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        const sortNewestFirst = (a, b) => b.created_at - a.created_at;
        console.log(tweets);
        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  };
}
