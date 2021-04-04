const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  username: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String,
  },
  OrangeTypes: [{ rate: String, name: String }],
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
