const express = require("express")
const Hubs = require('./hubs-model.js');

const router= express.Router()

router.get('/api/hubs', (req, res) => {
    console.log(req.query)
    //Hubs.find({sortBy: req.query.sortBy})
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
  router.get('/api/hubs/:id', (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    });
  });
  
  router.post('/api/hubs', (req, res) => {
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });
  
  router.delete('/api/hubs/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  });
  
  router.put('/api/hubs/:id', (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  });

//return all users
router.get("/api/hubs/:id/messages",(req,res)=>{
    //model function return a promise so we have to wait for
    //the promise to reseolve .then or reject with .catch
    Hubs.findHubMessages(req.params.id)
    .then((messages)=>{
        console.log(messages)
        //send it back
        //dont have to check if its empty, it could be empty array
        res.json(messages)


    })
    .catch((err)=>{
        console.log(err)
        //we dont' want to log sensitive info to the client
        res.status(500).json({
            messag:"Could not get user posts"
        })

    })
})


router.get("/api/hubs/messages/:messID", (req,res)=>{
    Hubs.findMessageById(req.params.messID)
    .then(()=>{
        if (post){
            res.json(post)
        }else{
            res.status(404).json({
                message: "404 messages not found for that user"
            })
        }

    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            message:"Could not get user post"
        })

    })
})

router.post("/api/hubs/:hubsID/messages", (req,res)=>{
    if (!req.body.text){
        return res.status(400).json({
            message: "Need a value for text"
        })
        
    }
    Hubs.addMessage(req.params.id, req.body)
    .then((hub)=>{
        //check if user exists
        res.status(201).json(hub)

    })
    .catch(()=>{
        res.status(500).json({message:"user doesnt exist"})
    })

})

//single post by id
// router.get("/api/hubs/:hubsID/messages/:messID", (req,res)=>{
//     Hubs.findMessageById(req.params.hubsID, req.params.messID)
//     .then(()=>{
//         if (post){
//             res.json(post)
//         }else{
//             res.status(404).json({
//                 message: "404 messages not found for that user"
//             })
//         }

//     })
//     .catch((err)=>{
//         console.log(err)
//         res.status(500).json({
//             message:"Could not get user post"
//         })

//     })
// })
  module.exports=router
  