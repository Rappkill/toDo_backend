const http = require('http');
const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const { table } = require('console');
const db = new sqlite3.Database('./toDo');

const port = 3000;

//DataBase
db.run('CREATE TABLE IF NOT EXISTS toDo(user text, goal text, nextGoal text)', (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
});


const { user, goal, nextGoal } = req.params

// Add new item
app.post('./toDo', function(req, res) {
    db.run(`INSERT INTO toDo(user, nextGoal) VALUES(?), (?))`, [user, nextGoal], (err) => {
        if (err) { 
            throw err;
        }
        res.send(`User ${user} set a new goal: ${nextGoal}`);
    })
});

//View items
app.get('./toDo', function(req, res) { 
    db.each(`SELECT User user, Goal goal, NextGoal nextGoal FROM toDo`, [user, goal, nextGoal], (err, row) => {
        if (err) {
            throw err;
        }
        res.send( `User ${user} has following item: ${goal} and his next goal is: ${nextGoal}`)
    })
});

//Modify item
app.post('./toDo', function(req, res){
    db.run(`UPDATE toDo SET user = ? goal = ? nextGoal = ? WHERE user = ?, goal = ?, nextGoal = ?`, [user, goal, nextGoal], function(err){
        if (err) {
            throw err;
        }
    res.send(`Row(s) updated: ${this.changes}`);
    });    
}); 

//Delete item
 app.post('./toDo',function(req, res){
    db.run(`DELETE from toDo WHERE user = ?, goal = ?, nextGoal = ?`, [user, goal, nextGoal], function (err) {
    if (err) {
            throw err;
        }
        res.send(`Row(s) deleted: ${this.changes}`);
    });
})


app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});

// Close the connection with database
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});