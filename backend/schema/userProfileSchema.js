const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  username: { type: String, required: true },
  Description: { type: String },
  img: {
    data: Buffer,
    contentType: String,
  },
  OrangeTypes: [],
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
