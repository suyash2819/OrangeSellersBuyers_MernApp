const { response } = require("express");
var express = require("express");
var router = express.Router();
const Profile = require("../schema/userProfileSchema.js");
const User = require("../schema/userSchema.js");

router.get("/", function (req, res) {
  User.find({ usertype: "Seller" }, function (err, result) {
    if (err) res.send(err);
    else res.send(result);
  });
});

module.exports = router;
