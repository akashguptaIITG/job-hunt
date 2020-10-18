const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_ROLES } = require("../common/constant");
const { saltRounds } = require("config").get("app");
const Types = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: [USER_ROLES.EMPLOYEE, USER_ROLES.PROJECT_MANGER],
    },
    jobApplications: [{ type: Types.ObjectId, ref: "Job" }],
  },
  { collection: "user", selectPopulatedPaths: false, timestamps: true } //preventing pluralization and population of ref
);

// hasing password
UserSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
};
// validating password
UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", UserSchema);
