const JobModel = require("../model/job");
module.exports = {
  async getAllJobs(req, res, next) {
    try {
      const user = req.user;
      const jobs = await JobModel.find({});
      res.render("job/list", { jobs, user });
    } catch (error) {
      next(err);
    }
  },
  async getJobDetails(req, res, next) {
    try {
      const { id } = req.params;
      const job = await JobModel.findById(id);
      const user = req.user;
      res.render("job/details", { job, user });
    } catch (error) {
      next(err);
    }
  },
  getAddJobPage(req, res) {
    const user = req.user;
    res.render("job/add", { user });
  },
  async getUpdateJobPage(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const job = await JobModel.findById(id);
      job.technologies = job.technologies.join(",").toString();
      res.render("job/update", { job, user });
    } catch (err) {
      next(err);
    }
  },
  async addJob(req, res, next) {
    try {
      req.body.technologies = req.body.technologies.split(",");
      const job = new JobModel(req.body);
      job.addCreatedBy(req.user._id);
      await job.save();
      res.status(201).json({ message: "job created successfully" });
    } catch (err) {
      next(err);
    }
  },
  async updateJobDetails(req, res, next) {
    try {
      const { id } = req.params;
      req.body.technologies = req.body.technologies.split(",");
      const job = await JobModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(204).json({ message: "updated succesfully" });
    } catch (err) {
      next(err);
    }
  },
  applyToJob(req, res) {
    const { id } = req.params;
  },
};
