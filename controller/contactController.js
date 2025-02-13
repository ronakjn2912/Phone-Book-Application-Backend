const asyncHandler = require("express-async-handler");
const { Contact } = require("../model/associations");

//@desc create contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, phone, email, date, cgroup } = req.body;
  if (!name || !phone || !cgroup) {
    res.status(400).json({
      message: "Required field is empty",
      success: false,
    });
    throw new Error("Required field is empty");
  }
  const contact = await Contact.create({
    name,
    phone,
    email,
    cgroup,
    user_id: req.user.id,
    date,
    favorite: false,
  });
  res.status(201).json({
    success: true,
    message: "Contact created",
    data: contact,
  }); //pass contact here to frontend
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.findAll({ where: { user_id: req.user.id } });
  if (!contacts) {
    res.send({ message: "No contacts" });
  } else {
    contacts.sort(
      (contact1, contact2) => contact2.favorite - contact1.favorite
    );
    res.status(200).json({
      success: true,
      message: "All Contacts",
      data: contacts,
    }); //send all contacts
  }
});

const updateContacts = asyncHandler(async (req, res) => {
  const editedContact = req.body;
  const existingContact = await Contact.findByPk(editedContact.id);
  if (!existingContact) {
    res.status(400);
    throw new Error("Contact you are trying to update doesn't exist");
  }

  if (existingContact.user_id != req.user.id) {
    res.status(403);
    throw new Error(
      "The contact you are trying to update doesn't belong to you"
    );
  }
  await Contact.update(
    {
      name: editedContact.name,
      phone: editedContact.phone,
      email: editedContact.email,
      date: editedContact.date,
      cgroup: editedContact.cgroup,
    },
    {
      where: { id: editedContact.id },
    }
  );
  res.status(200).json({
    success: true,
    message: "Contact updated",
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contactToBeDeleted = await Contact.findByPk(id);
  if (!contactToBeDeleted) {
    res.status(400);
    throw new Error("Contact doesn't exist");
  }

  if (contactToBeDeleted.user_id != req.user.id) {
    res.status(403);
    throw new Error(
      "The contact you are trying to delete doesn't belong to you"
    );
  }
  await Contact.destroy({
    where: { id: id },
  });
  res.status(200).json({
    success: true,
    message: "contact deleted",
    contact: contactToBeDeleted,
  });
});

const favoriteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contactToAddAsFavorite = await Contact.findByPk(id);
  if (!contactToAddAsFavorite) {
    return res
      .status(400)
      .json({ success: false, message: "Contact doesn't exist" });
  }
  const favoriteVal = contactToAddAsFavorite.favorite;
  if (!req.user.id === contactToAddAsFavorite.user_id) {
    return res.status(403).json({
      success: false,
      message: "Contact you are trying to manipulate doesn't belong to you",
    });
  }

  console.log("before ");
  await Contact.update(
    {
      favorite: !favoriteVal,
    },
    { where: { id: id } }
  );
  console.log("after ");
  res.status(200).json({
    success: true,
    message: "Contact added as favorite",
  });
});
module.exports = {
  createContact,
  getContacts,
  updateContacts,
  deleteContact,
  favoriteContact,
};
