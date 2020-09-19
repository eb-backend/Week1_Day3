const express = require('express');

const Hubs = require('./hubs/hubs-model.js');

const router = express();

router.use(express.json());

router.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API...\m</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

router.listen(4000, () => {
  console.log('\n*** router Running on http://localhost:4000 ***\n');
});
