const express = require('express');
const morgan = require("morgan")
const logger= require("./middleware/logger")
const deny=require("./middleware/deny")
const Hubs = require('./hubs/hubs-model.js');
const userRouter=require("./hubs/hubs-router")
const userWelcome=require("./welcome/hubs-welcome")

const server = express();

server.use(express.json());
// server.use(morgan("combined")) //adds information from the person doing the call request in the console

//custom middleware - replicate morgan
// server.use((req, res, next)=>{
//   const time= new Date().toISOString()
//   console.log(`this is the ${time} ${req.ip}, ${req.method}, ${req.url}`)
//   next()
// })
server.use(logger())
server.use(deny())

server.use(userRouter)
server.use(userWelcome)




// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(4000, () => {
  console.log('\n*** server Running on http://localhost:4000 ***\n');
});
