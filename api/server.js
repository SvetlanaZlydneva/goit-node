const express = require("express");
const mongoose = require("mongoose");
const { db, port } = require("./config");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./contacts/contacts.router");
const usersRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("tiny"));
    this.server.use(express.static("public"));
  }

  initRoutes() {
    this.server.use("/api/auth", authRouter);
    this.server.use("/api/users", usersRouter);
    this.server.use("/api/contacts", contactsRouter);
  }

  async initDataBase() {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(port, () => {
      console.log("Started listening on port", port);
    });
  }
};
