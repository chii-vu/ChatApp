const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

/**
 * @route GET api/users
 * @desc Get all users
 */
router.get("/", validateToken, async (req, res) => {
  const listOfUsers = await Users.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(listOfUsers);
});

/**
 * @route POST api/users
 * @desc Register User
 */
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

/**
 * @route POST api/users/login
 * @desc Login User
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

/**
 * @route GET api/users/auth
 * @desc Check if user is logged in
 */
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

/**
 * @route GET api/users/basicinfo/:id
 * @desc Get basic info of a user
 */
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

/**
 * @route PUT api/users/changepassword
 * @desc Change password of a user
 */
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});

/**
 * @route DELETE api/users/delete
 * @desc Delete a user by id
 */
router.delete("/:userId", validateToken, async (req, res) => {
  const userId = req.params.userId;
  await Users.destroy({
    where: {
      id: userId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
