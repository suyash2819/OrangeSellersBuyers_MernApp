var express = require("express");
var router = express.Router();
const User = require("../schema/userSchema.js");

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  let user = new User();
  user.username = req.body.userName;
  user.password = req.body.password;
  user.email = req.body.userEmail;
  user.usertype = req.body.userType;
  user
    .save()
    .then(() => res.send("User Registered"))
    .catch((err) => {
      if (err.code && err.code == 11000)
        res.send("username/email id already exists");
      else res.send(err);
    });
});

module.exports = router;
