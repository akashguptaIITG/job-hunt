const jobs = [
  {
    _id: 1,
    projectName: "power.Js",
    clientName: "Neo",
    description: "exciting oportunity",
    status: "closed",
    role: "node developer",
    technologies: ["node", "javascript"],
    createdBy: 1,
  },
  {
    _id: 2,
    projectName: "trax",
    role: "React developer",
    clientName: "Tickle",
    technologies: ["React", "javascript", "net", "React", "javascript", "net"],
  },
  {
    _id: 3,
    projectName: "power.Js",
    role: "node developer",
    technologies: ["node", "javascript"],
  },
  {
    _id: 4,
    projectName: "power.Js",
    role: "node developer",
    technologies: ["node", "javascript"],
  },
];
const JobModel = require("../model/job");
module.exports = {
  getAllJobs(req, res) {
    res.render("job/list", { jobs });
  },
  getJobDetails(req, res) {
    const { id } = req.params;
    const job = jobs.filter((j) => j._id == id)[0];
    res.render("job/details", { job });
  },
  getAddOrUpdateJobPage(req, res) {
    const { _id } = req.query;
    const job = jobs.filter((j) => j._id == _id)[0];
    res.render("job/add-or-update", { job });
  },
  async addJob(req, res) {
    const job = new JobModel(req.body);
    await job.save();
    res.status(201).json({ message: "job created successfully" });
  },
  addOrUpdateJobDetails(req, res) {},
  applyToJob(req, res) {},
};
