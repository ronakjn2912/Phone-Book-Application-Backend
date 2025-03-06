const Unauthenticated = require("../../errors/Unauthenticated");
const UserInputError = require("../../errors/UserInputError");
const {Contact} = require("../../model/associations");

const createContactResolver = async (_, args) => {
  if (!args.name || !args.phone || !args.cgroup) {
    const invalidArgs = [];
    if (!args.name) invalidArgs.push("name");
    if (!args.phone) invalidArgs.push("phone");
    if (!args.cgroup) invalidArgs.push("cgroup");
    throw new UserInputError("Required field is empty", { invalidArgs });
  }

  if (!args.user_id) {
    throw new Unauthenticated("User id missing in request body");
  }
  const contact = await Contact.create({
    name: args.name,
    phone: args.phone,
    email: args.email || "",
    cgroup: args.cgroup,
    user_id: args.user_id,
    favorite: false,
  });


  return {
    success: true,
    message: "Contact created",
    Contact: contact,
  };
};

const getContactsResolver = () => {
  const contacts = [
    {
      id: 1,
      name: "ronak",
      phone: "1234567890",
      email: "ronakjain",
    },
    {
      id: 2,
      name: "ronak",
      phone: "1234567890",
      email: "ronakjain",
    },
  ];
  return {
    success: true,
    message: "Contacts fetched",
    Contacts: contacts,
  };
};

module.exports = { createContactResolver, getContactsResolver };
