const { response } = require("express");
var express = require("express");
var router = express.Router();
const Profile = require("../schema/userProfileSchema.js");

router.get("/", function (req, res) {
  console.log(req.query);
  Profile.findOne(
    { username: req.query.username },
    function (err, profileData) {
      if (err) res.send(err);
      res.send(profileData);
    }
  );
});

router.post("/", function (req, res) {
  let profile = new Profile();
  profile.username = req.body.username;
  profile.img = req.body.image;
  profile.OrangeTypes = req.body.orangeTypes;
  profile.Description = req.body.description;
  profile
    .save()
    .then(() => {
      res.send("profile saved");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/", function (req, res) {
  console.log(req.body);
  Profile.updateOne(
    { username: req.body.username },
    { $addToSet: { OrangeTypes: req.body.orangeTypes } },
    function (err, result) {
      if (err) res.send(err);
      else res.send("updated" + " " + result);
    }
  );
});

router.put("/update", function (req, res) {
  console.log(req.body);
  Profile.updateOne(
    { username: req.body.username, "OrangeTypes.type": req.body.type },
    { $set: { "OrangeTypes.$": req.body.newValue } },
    function (err, result) {
      if (err) res.send(err);
      else res.send("value updated" + " " + result);
    }
  );
});
module.exports = router;
