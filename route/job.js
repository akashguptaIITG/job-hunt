const { USER_ROLES } = require("../common/constant");
const jobController = require("../controller/job");
const authMiddleware = require("../middleware/auth");
const router = require("express").Router();
const passport = require("passport");

// get add job page
router.get(
  "/add",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.PROJECT_MANGER]),
  ],
  jobController.getAddJobPage
);
// get udpate job page
router.get(
  "/update/:id",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.PROJECT_MANGER]),
  ],
  jobController.getUpdateJobPage
);

// get job  details
router.get(
  "/:id",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([
      USER_ROLES.EMPLOYEE,
      USER_ROLES.PROJECT_MANGER,
    ]),
  ],
  jobController.getJobDetails
);
// get all jobs
router.get(
  "/",
  [
    authMiddleware.isAuthenticated(),

    authMiddleware.isAuthorized([
      USER_ROLES.EMPLOYEE,
      USER_ROLES.PROJECT_MANGER,
    ]),
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
//update job details
router.put(
  "/:id",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.PROJECT_MANGER]),
  ],
  jobController.updateJobDetails
);

// add job details
router.post(
  "/",
  [
    authMiddleware.isAuthenticated(),
    authMiddleware.isAuthorized([USER_ROLES.PROJECT_MANGER]),
  ],
  jobController.addJob
);

module.exports = router;
