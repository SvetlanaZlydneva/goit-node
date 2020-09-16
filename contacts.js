const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newListContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
  return listContacts();
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: contacts.length + 1, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
