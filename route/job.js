const { USER_ROLES } = require("../common/constant");
const jobController = require("../controller/job");
const authMiddleware = require("../middleware/auth");
const router = require("express").Router();

// get add or udpate page
router.get(
  "/add-or-update",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.PROJECT_MANGER]),
  ],
  jobController.getAddOrUpdateJobPage
);

// get job  details
router.get(
  "/:id",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.EMPLOYEE]),
  ],
  jobController.getJobDetails
);
// get all jobs
router.get(
  "/",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.EMPLOYEE]),
  ],
  jobController.getAllJobs
);

// apply to a job : partial update
router.patch(
  "/:id/apply",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.EMPLOYEE]),
  ],
  jobController.applyToJob
);
//add or update job details
router.put(
  "/:id",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.PROJECT_MANGER]),
  ],
  jobController.addOrUpdateJobDetails
);

module.exports = router;
