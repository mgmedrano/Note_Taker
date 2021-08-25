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

app.post("/api/notes", function(req, res) {
    try {
      notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
      console.log(notesData);
  
      notesData = JSON.parse(notesData);
      req.body.id = notesData.length;
  
      notesData.push(req.body);
      notesData = JSON.stringify(notesData);
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
          if (err) throw err;
      });
      res.json(JSON.parse(notesData));
  
    } catch (err) {
      throw err;
      console.error(err);
    }
  });

app.listen(PORT, function () {
    console.log("Listening on PORT" + PORT);
});