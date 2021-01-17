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
    // console.log(note);
    let dbData = [];
    

    //Reading the JSON file and writing to the db.json if there is no other data in the database
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, data) => {
        if (data ===""){
            dbData.push(note);
            fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(dbData), (err) => {
                err ? console.error(err) : res.json(dbData); console.log("The note has been saved to the database.");
            })
            console.log(error);
        } else{
                // let currentData = data.slice(0);
                // dbData.push(currentData, JSON.stringify(note));
                dbData.push(data, JSON.stringify(note));
            fs.writeFile(path.join(__dirname, "db/db.json"), dbData, (err) => {
                err ? console.error(err) : data.push(res.json(dbData)); console.log("The note has been saved to the database.");
            })
        
            console.log(error);
        };
    });


})


//Listening in on the PORT

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});





// app.post("/api/notes", (req, res) => {
//     let note = req.body;
//     console.log(note);
    

//     //Reading the JSON file
//     fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, jsonData) => {
//         if (error){
//             console.log(error);
//         }
//         try{
//             newData = [jsonData];
//             newData.push(note);
//             fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(newData), (err) =>{
//                 err ? console.error(err) : res.json(newData);console.log("The note has been saved to the database.");
//             })
//         }catch(err) {
//             console.log(err);
//         }
//     });




    // Reading the JSON file
    // fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (error, jsonData) => {
    //     if (error){
    //         console.log(error);
    //     }else if(jsonData === ""){
    //         try{
    //         newData = [];
    //         newData.push(JSON.stringify(note));
    //             fs.writeFile(path.join(__dirname, "db/db.json"), newData, (err) => {
    //             err ? console.error(err) : console.log("Database was empty. Note is now saved.");
    //         })}catch(err){
    //             console.log(err);
    //         }
    //     } else{
    //         newData.push(JSON.stringify(notes))
    //         fs.appendFile(path.join(__dirname, "db/db.json"), newData, (err) =>{
    //             err ? console.error(err) : console.log("Note added to the database.")
    //         })
    //     }