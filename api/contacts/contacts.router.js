const { Router } = require("express");
const {
  getContacts,
  getContactById,
  validateCreateContact,
  createContact,
  deleteContact,
  validateUpdateContact,
  updateContact,
} = require("./contacts.controller");
const contactsRouter = Router();

contactsRouter.get("/", getContacts);
contactsRouter.get("/:contactId", getContactById);
contactsRouter.post("/", validateCreateContact, createContact);
contactsRouter.delete("/:contactId", deleteContact);
contactsRouter.patch("/:contactId", validateUpdateContact, updateContact);

module.exports = contactsRouter;
