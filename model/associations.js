const User = require("./User");
const Contact = require("./Contact");

User.hasMany(Contact, { foreignKey: "user_id", sourceKey: "id" });
Contact.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

async function syncModels() {
  try {
    await User.sync();
    await Contact.sync();
    console.log("All models have been synchronized");
  } catch (error) {
    console.error("Error synchronizing models", error);
  }
}

module.exports = {
  Contact,
  User,
  syncModels,
};
