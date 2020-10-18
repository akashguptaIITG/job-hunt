const mongoose = require("mongoose");
const { JOB_STATUS } = require("../common/constant");
const Types = mongoose.Schema.Types;
const JobSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: { type: [String], required: true },
    userApplications: [{ type: Types.ObjectId, ref: "User" }],
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: JOB_STATUS.OPEN,
      enum: [JOB_STATUS.OPEN, JOB_STATUS.CLOSED],
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { collection: "Job", selectPopulatedPaths: false, timestamps: true } // preventing pluralization and population of ref
);

module.exports = mongoose.model("Job", JobSchema);
