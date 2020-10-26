const UserModel = require("../model/user");
module.exports = {
  getRegisterPage(req, res) {
    res.render("user/register.ejs");
  },
  async addUser(req, res, next) {
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
  async checkLogin(req, res, next) {
    try {
      const user = await UserModel.findOne({ username: req.body.username });
      if (!user || !(await user.validatePassword(req.body.password))) {
        res.status(401).json({ message: "invalid username or password" });
      } else {
        let authResult = user.toAuthJson();
        res.cookie("token", authResult.token);
        res.status(200).json(authResult);
      }
    } catch (err) {
      next(err);
    }
  },
};
