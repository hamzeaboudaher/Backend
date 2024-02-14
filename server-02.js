// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Simulierte Benutzerdatenbank
const users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' }
];

// Middleware für das Parsen von JSON-Anfragen
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware für die Überprüfung der Anmeldeinformationen
function checkLogin(req, res, next) {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        req.user = user;
        next(); // Weiter zur nächsten Middleware oder Route
    } else {
        res.status(401).send('Ungültige Anmeldeinformationen');
    }
}

// Statische Dateien bereitstellen (wie das HTML-Formular und die Indexseite)
app.use(express.static(path.join(__dirname, 'public')));

// POST-Route für die Anmeldung
app.post('/login', checkLogin, (req, res) => {
    res.send(`Erfolgreich angemeldet als ${req.user.email}`);
});

// Route für die Indexseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starten des Servers
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
