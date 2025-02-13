const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/dbConnection");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const { syncModels } = require("./model/associations");
connectDB();
syncModels()
  .then(() => {
    console.log("Database ready");
  })
  .catch(console.error);
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on  ${PORT}`);
});
