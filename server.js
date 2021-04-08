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
    index = 0;

    //Reading the JSON file and writing to the db.json if there is no other data in the database
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, data) => {
        dbData.push(note);
        if(!data){
            finalNotes = dbData.map((note) => {
                note.id = index++;
                return note;
            })
        }else{
            let allNotes = dbData.concat(JSON.parse(data));
            console.log(allNotes);
            finalNotes = allNotes.map((note) => {
                if(note.id){
                    note.id+ 1;
                    return note;
                }else{
                note.id = index++;
                return note;  
                }  
            });
        }
            fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(finalNotes), (err) => {
            err ? console.error(err) : console.log("The note has been saved to the database.");
            })
    });
res.json(note);
});


app.delete("/api/notes/:id", (req, res) => {
    let dbData = [];
    let id = req.params.id;
    console.log(parseInt(id));
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, data) => {
        // let allNotes = dbData.concat(JSON.parse(data));
        let allNotes = JSON.parse(data);
        const notesToKeep = allNotes.filter(note => note.id !== parseInt(id));
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notesToKeep), (err) => {
            err ? console.error(err) : console.log("Here is your new array of notes.")
        })
    });
    res.send("/notes");
})


//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});


