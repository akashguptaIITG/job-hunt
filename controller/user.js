const UserModel = require("../model/user");
module.exports = {
  getRegisterPage(req, res) {
    res.render("register.ejs");
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
    res.render("login.ejs");
  },
  checkLogin(req, res) {},
};
