const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./contacts/contacts.router");

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Started listening on port", PORT);
    });
  }
};
