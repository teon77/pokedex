const { response } = require("express");

const errorHandler = (error, request, response, next) => {
  if(err) {
      response.send(error);
  }
  next();
}

  module.exports = errorHandler;
