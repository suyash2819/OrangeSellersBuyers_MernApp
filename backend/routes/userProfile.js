const { response } = require("express");
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
  profile.username = req.body.username;
  profile.image = req.body.image;
  profile.name = req.body.name;
  profile.save().then(() => {
    res.send("profile saved").catch((err) => {
      res.send(err);
    });
  });
});
