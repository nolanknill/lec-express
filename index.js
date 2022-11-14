const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8080;

function getContestants() {
    const contestantsJson = fs.readFileSync("./data/contestants.json");
    
    return JSON.parse(contestantsJson);
}

app.get("/contestants", (req, res) => {
    const contestants = getContestants();
    
    // respond with the array of contestants
    res.json(contestants);
})

app.listen(PORT, () => {
    console.log("Only going to see this");
    console.log("when our server is started!");
});