const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const tasksRouter = require('./routes/tasks');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', tasksRouter);

// error handling
app.use((err, req, res, next) => {
    res.status(500).json({message: "server error"});
});

app.listen(port, () => console.log(`Server running on port ${port}`));

