const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const contestantsRoutes = require("./routes/contestants");
const requireApiKey = require("./middleware/requireApiKey");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Only use requireApiKey middleware on /contestants routes
app.use("/contestants", requireApiKey, contestantsRoutes);

app.listen(PORT, () => {
    console.log("Only going to see this");
    console.log("when our server is started!");
});