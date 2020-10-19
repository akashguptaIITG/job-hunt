const UserModel = require("../model/user");
module.exports = {
  getRegisterPage(req, res) {
    res.render("user/register.ejs");
  },
  async addUser(req, res) {
    try {
      const newUser = new UserModel(req.body);
      await newUser.hashPassword();
      await newUser.save();
      res.status(201).json({ message: "user created successfully" });
    } catch (err) {
      next(err);
    }
  },
  getLoginPage(req, res) {
    res.render("user/login.ejs");
  },
  async checkLogin(req, res) {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user || !(await user.validatePassword(req.body.password))) {
      res.status(401).json({ message: "invalid username or password" });
    } else {
      res.status(200).json(user.toAuthJson());
    }
  },
};
