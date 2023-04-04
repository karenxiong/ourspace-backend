const express = require("express");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.OURSPACE_APP_BASE_URL || 8080;

app.use(cors());

//middleware
app.use(express.json());

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/collections", collectionRoutes);

app.listen(PORT, () =>
  console.log(`Server running at http://Localhost:${PORT}`)
);
