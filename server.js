const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const cors = require("cors");
require("dotenv").config();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const app = express();
const PORT = process.env.OURSPACE_APP_BASE_URL || 8080;

const checkJwt = auth({
  audience: "http://localhost:8080/",
  issuerBaseURL: `https://dev-ezihsb7v3ye3h2nz.us.auth0.com/`,
});

app.use(cors());

//middleware
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/collections", collectionRoutes);

// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

app.listen(PORT, () =>
  console.log(`Server running at http://Localhost:${PORT}`)
);
