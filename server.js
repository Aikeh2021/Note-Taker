//Requiring module(s)

const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

//Defining a port for the server

const PORT = process.env.PORT || 8080;

//Creating an instance of express

const app = express();

//Middleware for body parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
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
    res.sendFile(path.join(__dirname, "db/db.json"));
});
app.post("/api/notes", (req, res) => {
    let note = req.body;
    let dbData = [];

    //Reading the JSON file and writing to the db.json if there is no other data in the database
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, data) => {
        if (!data){
            dbData.push(note);
            fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(dbData), (err) => {
                err ? console.error(err) : console.log("The note has been saved to the database.");
            })

        } else {
            dbData.push(note);
            let allNotes = dbData.concat(JSON.parse(data));
            fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(allNotes), (err) => {
            err ? console.error(err) : console.log("The note has been saved to the database.");
            })
        };
    });
res.json(note);

});

app.delete("/api/notes:id", (req, res) => {

});




//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});


