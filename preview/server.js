const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');


const app = express();

app.use(connectLivereload());
app.use(express.static(__dirname));

app.listen(3000, () => {
  console.info(`Development server is running on port: ${3000}`);
});

const assets = [
  `${__dirname}/assets/`,
];

const livereloadServer = livereload.createServer();
livereloadServer.watch(assets);
