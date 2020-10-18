const router = require("express").Router();
router.use("/job", require("./job"));
router.use("/user", require("./user"));
router.use("**", (req, res) => res.redirect("/job"));
module.exports = router;
