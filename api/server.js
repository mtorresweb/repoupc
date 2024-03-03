const express = require("express");
const app = express();

const connection = require("./database/connection.js");
connection();

const cors = require("cors");
app.use(cors());

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
const userRoutes = require("./routes/user.js");
const requestRoutes = require("./routes/request.js");
const repositoryRoutes = require("./routes/repository.js");
const commentRoutes = require("./routes/comment.js");
const adminRoutes = require("./routes/admin.js");

//routes configuration
app.use("/api/user", userRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/repository", repositoryRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`App listening on port ${port}!`));
