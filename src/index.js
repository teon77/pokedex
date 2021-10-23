const express = require('express');
const app = express();
const port = 8080;
const pokemonData = require('./pokemon-data');
const pokemonRouter = require('./routers/pokemonRouter');
const userRouter = require('./routers/userRouter');
const errorHandlerMiddleware = require('./middleware/errorHandler');
const userMiddleware = require('./middleware/userHandler');

app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/',errorHandlerMiddleware);
app.use('/pokemon', userMiddleware ,pokemonRouter);
app.use('/', userRouter);






// start the server
app.listen(port, function() {
  console.log('app started');
});
