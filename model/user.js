const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("../common/constant");
const { saltRounds } = require("config").get("app");
const jwtConfig = require("config").get("jwt");

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
UserSchema.methods.issueJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      role: this.role,
    },
    process.env.JWT_SECRET,
    jwtConfig
  );
};

UserSchema.methods.toAuthJson = function () {
  return {
    username: this.username,
    _id: this._id,
    role: this.role,
    token: this.issueJwt(),
  };
};

module.exports = mongoose.model("user", UserSchema);
