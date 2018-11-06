const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname + './../public');
console.log(publicPath);

const app = express();

// Express static middleware that serves up the html file
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})