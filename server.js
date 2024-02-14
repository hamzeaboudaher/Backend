const express = require('express');

const fs = require ("fs");
const app = express();
const port = 3001;

app.use(express.json());

const playersJSONFilePath = "./players.json";
// const port = process.env.PORT || 3000 ;

app.get("/hello", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/randoom", (req, res) => {
    const randomNum = Math.floor(Math.random() * 100 +1).toString(); 
    res.send(randomNum);
    console.log("Server says:" + randomNum + ". This number is " + (100 - randomNum) + "units away from 100" );
  });

//   Dateiinhalt lesen
//   fs.readFile('package.json' , 'utf8' , (err , data) => {
//     if (err){
//         console.error(err);
//         return ;
//     }
//     console.log(data);
//   });


//   Daten in eine neue Datei schreiben
  const content = 'hello world';
  fs.writeFile('newFile.txt', content , 'utf8' , (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Die Datei wurde erfolgreich geschrieben");
  });


//Ordner erstellen
fs.mkdir('newFolder', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Ordner wurde erfolgreich erstellt");
});


//Eine Datei löschen
fs.unlink('newFile.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Datei wurde gelöscht");
})



const players = [
    {
      id: 1,
      name: "Lebron James",
      team: "Lakers",
      number: 23,
    },
  
    {
      id: 2,
      name: "Kevin Durant",
      team: "Nets",
      number: 7,
    },
  ];

  app.get('/players', (req , res) => {
    res.send(players)
  });


  // GET /players/:id
app.get ('/players/:id',(req , res) => {
    const id = parseInt(req.params.id);
    const player = players.find((player) => player.id === id);
      // update the response status if the player is not found
    if (!player) res.status(404).send("Player not found");
    res.send(player);
});


// POST /add-player/ (create a new player)
// app.post("/add-player",(req , res) => {
//     console.log("req.body :", req.body);
//     const newPlayer = req.body ;
//     players.push(newPlayer);
//     res.send(newPlayer);
// });
// In Terminal =>
// curl -X POST -H "Content-Type: application/json" -d '{"id": 50, "name": "Stephen Curry", "team": "Warriors", "number": 30}' http://localhost:3000/add-player/




app.get("/", (req, res) => {
  res.send("Welcome to the NBA API");
});


app.get("/playerss", (req, res) => {
  const data = fs.readFileSync(playersJSONFilePath, "utf8");
  // res.send(data); // this will download the file
  res.send(JSON.parse(data)); // this will send the data as JSON
});



app.get("/playerss/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const players = JSON.parse(fs.readFileSync(playersJSONFilePath));
  const player = players.find((player) => player.id === id);
  // update the response status if the player is not found
  if (!player) res.status(404).send("Player not found");
  res.send(player);
});



app.post("/add-player", (req, res) => {
  console.log('req:',req);
  console.log("req.body:", req.body);
  const players = JSON.parse(fs.readFileSync(playersJSONFilePath));
  const newPlayer = { id: players.length + 1, ...req.body };
  players.push(newPlayer);
  fs.writeFileSync(playersJSONFilePath, JSON.stringify(players));
  res.send(newPlayer);
});


//   http://localhost:3000/example?value=2

// app.get("/example", (req, res) => {
//     console.log(req.query);
//     const value = req.query.value ;
//     res.send(`<h1>${value}<h1/>`);
//   });


const logEndPoints = () => {
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            const url = `http://localhost:${port}${r.route.path}`;
            console.log(url)
        }
    })
}

app.listen(port, () => {
  console.log(`server work on port ${port}`);
  logEndPoints();
});



