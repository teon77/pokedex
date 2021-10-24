const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')
const pRouter = require("./routers/pokemonRouter");
const userRouter = require("./routers/userRouter");
const { errorHandler } = require("./middleware/errorHandler");
const { usersHandler } = require("./middleware/userHandler");

  /*  app.use((req, res, next) => { // chrome only work with this headers !
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});    */
app.use(cors());

 app.use(express.json());
 app.use("/pokemon", usersHandler, pRouter);
 app.use("/user", userRouter);
 app.use(errorHandler);


// start the server
app.listen(port, function() {
  console.log('app started');
});