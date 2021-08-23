//require
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

app.listen(PORT, function () {
    console.log("Listening on PORT" + PORT);
});
