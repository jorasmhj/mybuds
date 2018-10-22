import express, { static } from 'express';
const app = express();
import path from 'path';

app.use(static(__dirname + './dist/explorer'));

app.listen(process.env.PORT || 8080);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/explorer/index.html'));
});
