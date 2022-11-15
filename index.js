const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const contestantsRoutes = require("./routes/contestants");
const requireApiKey = require("./middleware/requireApiKey");

// TODO: figure out not calling middleware when static assets are loaded
// TODO: paths in route files

app.use(cors());
app.use(express.static("public"));
app.use(requireApiKey);
app.use(express.json());

app.use("/contestants", contestantsRoutes);

app.listen(PORT, () => {
    console.log("Only going to see this");
    console.log("when our server is started!");
});