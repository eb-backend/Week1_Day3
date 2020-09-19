module.exports=()=>{
    return (req,res)=>{
        const agent = req.headers["user-agent"]

        if(/insomnia/.test(agent)){
        return res.status(418).json({message: "No insomnia allowed here"})
        }
        next()
    }
}