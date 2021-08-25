//require node packages
const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express ();
let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));
let notes = require("./db/db.json")

app.get("/notes", function (req, res) {
    res.sendFile(path.join(_dirname, "public/notes.html"));
});

app.get("/api/notes", function(req,res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(notes);
    });
});

app.post("/api/notes", function (req, res) {
    let note = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let id = note + Date.now();
    let newNote = {
      id: id,
      title: req.body.title,
      text: req.body.text,
    };
    console.log(typeof notes);
    notes.push(newNote);
    const stringifyNote = JSON.stringify(notes);
    res.json(notes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Note saved to db.json");
      }
    });
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.listen(PORT, function () {
    console.log("Listening on PORT" + PORT);
});