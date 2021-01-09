//Requiring module(s)

const express = require("express");
const path = require("path");

//Defining a port for the server

const PORT = process.env.PORT || 8080;

//Creating an instance of express

const app = express();

//Middleware for body parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});

//Adding a test route

app.get("/api/config", (req, res) => {
    res.json({
        noteTaker : "commencing process"
    });
});

//View Routes
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});