# Express 1 Setup

Steps below to set up an Express application that responds to a GET request on port 8080.

Initialize node project:
- `npm init`

Install dependencies:
- `npm install express`
- `npm install --save-dev nodemon`

Add nodemon to scripts in package.json
```
"scripts": {
    "npx nodemon index.js"
}
```

Create index.js:
```
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to /");
})

app.listen(8080);
```

Run server:
- `npm run dev`