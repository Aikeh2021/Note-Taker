//Requiring module(s)

const express = require("express");

//Defining a port for the server

const PORT = process.env.PORT || 8080;

//Creating an instance of express

const app = express();

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});
