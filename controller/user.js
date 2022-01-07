const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;
const userModel = require("../models/user");
const Users = userModel(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // ini untuk daftar usernya
  post: async (req, res) => {
    const saltRound = 10;
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, saltRound);
    try {
      const data = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });
      res.json(data);
    } catch (Error) {
      console.log(Error);
      res.status(422).json({ message: Error.sqlMessage });
    }
  },
  // untuk login user
  login: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const data = await Users.findOne({
        where: {
          username: username,
        },
      });
      if (!data) {
        throw Error("Data tidak ditemukan");
      }
      const isVeryvied = await bcrypt.compare(password, data.password);
      if (!isVeryvied) {
        throw Error("Password salah");
      }

      const payload = {
        Username: process.env.USERNAME,
        password: process.env.PASSWORD,
      };
      const token = jwt.sign(payload, process.env.TOKEN);
      res.json({ username: data.username, data: data.password, token: token });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },
  const: (autentiCation = (req, res, next) => {
    const token = req.headers.authorization;
    const user = jwt.decode(token, process.env.TOKEN);
    if (!user || !token) {
      return res.status(401).json({ message: "Harap register terlebih dahulu" });
    }
    req.payload = user;
    next();
  }),
  // lanjutan dari login
  daftar: async (req, res) => {
    try {
      res.json({ message: "Berhasil masuk!" });
    } catch (Error) {
      res.json({ message: Error.sqlMessage });
    }
  },
  // untuk logou/keluar aplikasi
  logout: async (req, res) => {
    try {
      res.json({ message: "log out berhasil!" });
    } catch (Error) {
      res.json({ message: "coba lagi nanti!" });
    }
  },
};
