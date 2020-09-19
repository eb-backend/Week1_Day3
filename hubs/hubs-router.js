const express = require("express")
const Hubs = require('./hubs-model.js');
const { checkUserID } = require("../middleware/hubs.js");
const {validate} = require("../middleware/validate.js");

const router= express.Router()

router.get('/api/hubs', (req, res) => {
    console.log(req.query)
    //Hubs.find({sortBy: req.query.sortBy})
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      //if next gets called with no parameters is going to move to the nex piece of middleware
      next(error) //when we don't know exactly which error this comes from. whether is from third party package etc...
      // log error to database
    //   console.log(error);
    //   res.status(500).json({
    //     message: 'Error retrieving the hubs',
    //   });
    // });

    });
  });
  
  router.get('/api/hubs/:id', checkUserID(), (req, res) => {
    //access data from middleware into the route handler
    //middleware stack has shared state ->req,res

    res.status(200).json(req.hub)

    //*this part is now the middleware in hubs file
    // Hubs.findById(req.params.id)
    // .then(hub => {
    //   if (hub) {
    //     res.status(200).json(hub);
    //   } else {
    //     res.status(404).json({ message: 'Hub not found' });
    //   }
    // })
    // .catch(error => {
    //   // log error to database
    //   console.log(error);
    //   res.status(500).json({
    //     message: 'Error retrieving the hub',
    //   });
    // });
    //*
  });
  
  router.post('/api/hubs', validate(), (req, res) => {
    // if (!req.body.name || !req.body.email){
    //   return res.status(400).json({
    //     message: "Missing user name or email"
    //   })
    // }
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(next);
    
  });
  
  router.delete('/api/hubs/:id', checkUserID(),(req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(next);
  });
  
  router.put('/api/hubs/:id', validate(), checkUserID(), (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(next);
  });

//return all users
router.get("/api/hubs/:id/messages", checkUserID(), (req,res)=>{
    //model function return a promise so we have to wait for
    //the promise to reseolve .then or reject with .catch
    Hubs.findHubMessages(req.params.id)
    .then((messages)=>{
        console.log(messages)
        //send it back
        //dont have to check if its empty, it could be empty array
        res.json(messages)


    })
    .catch(next)
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
    .catch(next)
})

router.post("/api/hubs/:hubsID/messages", checkUserID(), (req,res)=>{
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
  