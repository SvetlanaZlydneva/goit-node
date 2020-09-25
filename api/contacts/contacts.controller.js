const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../contacts");
const Joi = require("joi");

class ContactsController {
  async getContacts(_, res) {
    const contacts = await listContacts();
    return res.status(200).send(contacts);
  }

  async getContactById(req, res) {
    const { contactId } = req.params;
    const contact = await getById(parseInt(contactId, 10));
    return contact
      ? res.status(200).send(contact)
      : res.status(404).send({ message: "Not found" });
  }

  async createContact(req, res) {
    const contact = await addContact({ ...req.body });
    return res.status(201).send(contact);
  }

  async deleteContact(req, res) {
    const { contactId } = req.params;
    const contact = await getById(parseInt(contactId, 10));
    if (!contact) return res.status(404).send({ message: "Not found" });
    await removeContact(parseInt(contactId, 10));
    return res.status(200).send({ message: "contact deleted" });
  }

  async updateContact(req, res) {
    const { contactId } = req.params;
    const contact = await getById(parseInt(contactId, 10));
    if (!contact) return res.status(404).send({ message: "Not found" });
    await updateContact(parseInt(contactId, 10), req.body);
    const updatedContact = await getById(parseInt(contactId, 10));
    return res.status(200).send(updatedContact);
  }

  validateCreateContact(req, res, next) {
    const createContantactRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const result = createContantactRules.validate({ ...req.body });
    if (result.error) {
      return res.status(400).send({ message: "missing required name field" });
    }
    next();
  }

  validateUpdateContact(req, res, next) {
    const updateContantactRules = Joi.object()
      .keys({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
      })
      .or("name", "email", "phone");
    const result = updateContantactRules.validate({ ...req.body });
    if (result.error) {
      return res.status(400).send({ message: "missing fields" });
    }
    next();
  }
}

module.exports = new ContactsController();
