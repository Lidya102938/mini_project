require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controller/user");
const noteController = require("./controller/note");

app.use(express.json());

app.post("/post", userController.post);

app.post("/login", userController.login);

app.post("/daftar", userController.daftar);

app.post("/create", noteController.create);

app.get("/read", noteController.read);

app.get("/detail/:id", noteController.detail);

app.put("/update/:id", noteController.update);

app.delete("/delete/:id", noteController.delete);

app.get("/logout", userController.logout);

app.listen(process.env.PORT, () => console.log("Listening at port: " + process.env.PORT));
