const express = require('express');
const app = express();
const PORT = 8080;
const contestantsRoutes = require("./routes/contestants");
const requireApiKey = require("./middleware/requireApiKey");

app.use(express.json());
app.use(requireApiKey);

app.use("/contestants", contestantsRoutes);

app.listen(PORT, () => {
    console.log("Only going to see this");
    console.log("when our server is started!");
});