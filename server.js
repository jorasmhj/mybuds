const express = require('express');
const app = express();
import path from 'path';

app.use(express.static(__dirname + '/dist/explorer/'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/explorer/index.html'));
});

app.listen(process.env.PORT || 8080);
