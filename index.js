const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8080;

function getContestants() {
    const contestantsJson = fs.readFileSync("./data/contestants.json");
    
    return JSON.parse(contestantsJson);
}

app.get("/contestants", (req, res) => {
    let contestants = getContestants();
    
    // ?country=USA
    if (req.query.country) {
        contestants = contestants.filter((contestant) => {
            return contestant.country === req.query.country; 
        })
    }

    // ?sort=age_desc OR ?sort=age_asc
    switch (req.query.sort) {
        case "age_desc":
            contestants.sort((a, b) => b.age - a.age);
            break;
        case "age_asc":
            contestants.sort((a, b) => a.age - b.age);
            break;
    }

    res.json(contestants);
})

app
    .route("/contestants/:id")
    .get((req, res) => {
        const id = Number(req.params.id);

        const contestants = getContestants();

        const contestant = contestants.find((contestant) => {
            return contestant.id === id;
        })

        if (!contestant) {
            return res.status(404).json({
                error: "Contestant does not exist"
            })
        }

        return res.json(contestant);
    })
    .delete((req, res) => {
        const id = Number(req.params.id);

        const contestants = getContestants();

        const remainingContestants = contestants.filter((contestant) => {
            return contestant.id !== id;
        })

        // check if we deleted something
        if (contestants.length === remainingContestants.length) {
            return res.status(404).json({
                error: "Contestant does not exist"
            })
        }

        fs.writeFileSync(
            "./data/contestants.json", 
            JSON.stringify(remainingContestants)
        );

        return res.status(200).json({
            message: "Contestant deleted successfully"
        });

    });

app.listen(PORT, () => {
    console.log("Only going to see this");
    console.log("when our server is started!");
});