var express = require("express");
var router = express.Router();
const Profile = require("../schema/userProfileSchema.js");

router.get("/", function (req, res) {
  Profile.findOne({ username: req.username }, function (err, profileData) {
    if (err) res.send(err);
    res.send(profileData);
  });
});

router.post("/", function (req, res) {
  let profile = new Profile();
});
