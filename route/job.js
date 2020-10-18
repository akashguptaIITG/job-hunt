const jobController = require("../controller/job");
const authMiddleware = require("../middleware/auth");
const router = require("express").Router();

// get job  details
router.get("/:id", jobController.getJobDetails);
// get all jobs
router.get("/", jobController.getAllJobs);
// add a job
router.post(
  "/",
  [authMiddleware.isAuthenticated, authMiddleware.isAuthorized],
  jobController.addJob
);
// apply to a job : partial update
router.patch(
  "/:id/apply",
  [authMiddleware.isAuthenticated, authMiddleware.isAuthorized],
  jobController.applyToJob
);
//update job details
router.put(
  "/:id",
  [authMiddleware.isAuthenticated, authMiddleware.isAuthorized],
  jobController.updateJobDetails
);

module.exports = router;
