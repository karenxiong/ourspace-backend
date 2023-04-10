const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.OURSPACE_APP_BASE_URL || 8080;

const path = require("path");

// app.use(express.static(path.join(__dirname, "public/data/uploads")));
app.use("/public", express.static("public"));

//middleware
app.use(cors());
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/collections", collectionRoutes);

app.listen(PORT, () =>
  console.log(`Server running at http://Localhost:${PORT}`)
);
