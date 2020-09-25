const { Router } = require("express");
const {
  getContacts,
  getContactById,
  validateId,
  validateCreateContact,
  createContact,
  deleteContact,
  validateUpdateContact,
  updateContact,
} = require("./contacts.controller");
const contactsRouter = Router();

contactsRouter.get("/", getContacts);
contactsRouter.get("/:contactId", validateId, getContactById);
contactsRouter.post("/", validateCreateContact, createContact);
contactsRouter.delete("/:contactId", validateId, deleteContact);
contactsRouter.patch(
  "/:contactId",
  validateId,
  validateUpdateContact,
  updateContact
);

module.exports = contactsRouter;
