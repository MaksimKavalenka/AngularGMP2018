const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/AngularGMP2018'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/AngularGMP2018/index.html'));
});

app.listen(process.env.PORT || 8080);