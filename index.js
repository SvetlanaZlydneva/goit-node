const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { argv } = require("yargs");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      break;

    case "get":
      getContactById(id).then(console.table);
      break;

    case "add":
      addContact(name, email, phone).then(console.table);
      break;

    case "remove":
      removeContact(id).then(console.table);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
