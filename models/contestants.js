const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "../data/contestants.json");

function getContestants() {
    const contestantsJson = fs.readFileSync(filePath);
    
    return JSON.parse(contestantsJson);
}

function saveContestants(contestants) {
    fs.writeFileSync(
        filePath, 
        JSON.stringify(contestants)
    );
}

function getNextContestantId() {
    const contestants = getContestants();
    contestants.sort((a,b) => b.id - a.id);
    
    return contestants[0].id + 1;
}

module.exports = {
    getContestants,
    getNextContestantId,
    saveContestants
}