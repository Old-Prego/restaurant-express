const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/reservations', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.post('/api/reservations', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.uniqID.replace(/\s+/g, '').toLowerCase();
    console.log(newReservation);
  
    reservations.push(newReservation);
    res.json(newReservation);
  });

const handleRequest = (req,res) => {
  const path = req.url;

  switch (path) {
    case '/':
        read("index", res);
    case '/home':
        read("index", res);
    case '/reservations':
        read("reservation",res);
    case '/tables':
        read("tables",res);
    default:
        read('404',res);  
  }
}

function read(fileName, res){
    
  fs.readFile(`${__dirname}/${fileName}.html`, (err, data) => {

      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);

  });

};

app.get('/api/reservations', (req, res) => res.json(reservations));

app.get('/api/reservations/:reservation', (req, res) => {
  const chosen = req.params.reservation;

  console.log(chosen);

  for (let i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// const server = http.createServer(handleRequest);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));