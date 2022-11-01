const db = require("../db");
exports.isAdmin = (req,res,next)=>
{
    let id = req.auth;
    // console.log(id);
    db.query("select email from users where id = ?",[id],(err,result)=>
    {
        if(result.length==0){
        // return res.status(404).json({error:"please enter vaild email or password"});
        }
        // console.log(result[0].email);
        if(result[0].email!="manager@gmail.com"){
        return res.status(401).json({message:"Admin access required"});
        }
        next();
    });
}