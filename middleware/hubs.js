//check user ID
const Hubs = require('../hubs/hubs-model.js');

const checkUserID=()=>{
    return (req, res, next)=>{
        Hubs.findById(req.params.id)
        .then(hub => {
          if (hub) {
              //attach the hub data to the req
              //so we can access it later
              req.hub= hub
              //!needs to be reusable middleware
            // res.status(200).json(hub);
            next() //move to route handler function
          } else {
            res.status(404).json({ message: 'Hub not found' });
          }
        })
        .catch(next)
        // .catch(error => {
        //   // log error to database
        //   console.log(error);
        //   res.status(500).json({
        //     message: 'Error retrieving the hub',
        //   });
        // });

    }
}

module.exports={
    checkUserID
}