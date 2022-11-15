const validApiKey = "123";

function requireApiKey(req, res, next) {

    const apiKeyQuery = req.query.apiKey;

    if (apiKeyQuery === validApiKey) {
        return next();
    }

    console.log("Invalid key: ", apiKeyQuery);

    return res.status(401).json({
        error: "Invalid key: " + apiKeyQuery
    })
}

module.exports = requireApiKey;