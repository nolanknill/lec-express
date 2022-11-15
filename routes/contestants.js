const express = require('express');
const router = express.Router();
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

function getNextId() {
    const contestants = getContestants();
    contestants.sort((a,b) => b.id - a.id);
    return contestants[0].id + 1;
}

router
    .route("/")
    .get((req, res) => {
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
    .post((req, res) => {
        if (   !req.body.name
            || !req.body.hometown
            || !req.body.country
            || !req.body.age
            || !req.body.originalSeason
            || !req.body.image
            || !req.body.image.url
            || !req.body.image.alt
        ) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const newContestant = {
            id: getNextId(),
            name: req.body.name,
            hometown: req.body.hometown,
            country: req.body.country,
            age: req.body.age,
            originalSeason: req.body.originalSeason,
            image: {
                url: req.body.image.url,
                alt: req.body.image.alt
            }
        }

        const contestants = getContestants();
        contestants.push(newContestant);

        saveContestants(contestants);

        // response 
        res.status(201).json(newContestant);
    })

router
    .route("/:id")
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

        saveContestants(remainingContestants);

        return res.status(200).json({
            message: "Contestant deleted successfully"
        });

    });

module.exports = router;