const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/donate', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/donate.html'));
});

app.get('/checkSpent', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/checkSpent.html'));
});

app.get('/checkReceived', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/checkReceived.html'));
});

app.get('/getDonations', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/getDonations.html'));
}
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});