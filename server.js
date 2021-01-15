//Requiring module(s)

const express = require("express");
const path = require("path");
const fs = require("fs");

//Defining a port for the server

const PORT = process.env.PORT || 8080;

//Creating an instance of express

const app = express();

//Middleware for body parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// app.use("/public", express.static('server.js'));
app.use(express.static('public'));

//Adding a test route

app.get("/api/config", (req, res) => {
    res.json({
        noteTaker : "commencing process"
    });
});

//View Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API Routes
app.get("/api/notes", (req, res) => {
    
})


//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});


