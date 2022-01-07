const { DataTypes } = require("sequelize");
const sequelize = require("../models/index").sequelize;
const userModel = require("../models/notes");
const Notes = userModel(sequelize, DataTypes);
const jwt = require("jsonwebtoken");

module.exports = {
  // membuat notes
  create: async function (req, res) {
    try {
      const data = await Notes.create({ date: req.body.date, day: req.body.day, note: req.body.note });
      res.json(data);
    } catch (Error) {
      console.log(Error.message);
      res.status(422).json({ message: Error.message });
    }
  },
  update: async function (req, res) {
    const id = req.params.id;
    const data = await Notes.update(
      { note: req.body.note },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ pesan: "Data berhasil di update" });
  },
  read: async function (req, res) {
    const data = await Notes.findAll();
    res.json(data);
  },
  delete: async function (req, res) {
    const id = req.params.id;
    const data = await Notes.destroy({
      where: {
        id: id,
      },
    });
    res.json({ pesan: "Data berhasil di hapus" });
  },
  detail:async function(req,res){
      const id= req.params.id;
      const data= await Notes.findOne();
      res.json(data);
  },
};
