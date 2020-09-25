const contactModel = require("./contacts.model");
const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");

class ContactsController {
  async getContacts(_, res, next) {
    try {
      const contacts = await contactModel.find();
      return res.status(200).json(contacts);
    } catch (err) {
      next(err);
    }
  }

  async getContactById(req, res, next) {
    try {
      const { contactId } = req.params;
      const contact = await contactModel.findById(contactId);
      if (!contact) return res.status(404).send({ message: "Not found" });
      return res.status(200).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async createContact(req, res, next) {
    try {
      const contact = await contactModel.create(req.body);
      return res.status(201).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async deleteContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const contact = await contactModel.findByIdAndDelete(contactId);
      if (!contact) return res.status(404).send({ message: "Not found" });
      return res.status(200).send({ message: "contact deleted" });
    } catch (err) {
      next();
    }
  }

  async updateContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const contact = await contactModel.findByIdAndUpdate(
        contactId,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!contact) return res.status(404).send({ message: "Not found" });
      return res.status(200).json(contact);
    } catch (err) {
      next();
    }
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

  validateId(req, res, next) {
    const { contactId } = req.params;
    if (!ObjectId.isValid(contactId))
      return res.status(404).send({ message: "Not valid ID" });
    next();
  }
}

module.exports = new ContactsController();
