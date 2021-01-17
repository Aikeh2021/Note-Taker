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
    res.sendFile(path.join(__dirname, "db/db.json"));
});
app.post("/api/notes", (req, res) => {
    let note = req.body;
    console.log(note);
    

    //Reading the JSON file
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, jsonData) => {
        if (error){
            console.log(error);
        }
        try{
            fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify([jsonData, note]), (err) =>{
                err ? console.error(err) : console.log("The note has been saved to the database.");
            })
        }catch(err) {
            console.log(err);
        }
    });

})


//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});


