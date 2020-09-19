module.exports =()=>{
    return (req, res, next)=>{
  const time= new Date().toISOString()
  console.log(`this is the ${time} ${req.ip}, ${req.method}, ${req.url}`)
  next()
}}