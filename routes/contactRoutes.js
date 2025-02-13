const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContacts,
  deleteContact,
  favoriteContact
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").post(createContact).get(getContacts).put(updateContacts);

router.route("/:id").delete(deleteContact);
router.route("/favorite/:id").post(favoriteContact)
module.exports = router;
