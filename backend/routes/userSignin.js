var express = require("express");
var router = express.Router();
const User = require("../schema/userSchema.js");

router.get("/", function (req, res) {
  res.send("sigin in page");
});

router.post("/", function (req, res, next) {
  console.log(req.body);

  User.findOne({ username: req.body.userName }, function (err, user) {
    if (err) res.send(err);
    if (user) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) res.send(err);
        res.send({ isMatch, user });
      });
    } else {
      res.send({ isMatch: false, user });
    }
  });
});

module.exports = router;
