let sql = require("mssql/msnodesqlv8");
const jwt=require('jsonwebtoken');


var config = {
    server: 'DESKTOP-NVU9K8T\\SQLEXPRESS', 
    database: 'master',
    driver:'msnodesqlv8',
    options:{
        trustedConnection:true
    }
};

const login=async(req,res)=>{
    const{name,email}=req.body;
    
    const token=await jwt.sign({name,email},'u09ue203heihduiedwejowiehd',{expiresIn:'1d'});
    res.cookie('token',token,{
        httpOnly:false
    })
    res.send('ok')
  
}

const authenticate=async(req,res)=>{
    const token=req.cookies.token;
     try {  
        const verify=await jwt.verify(token,'u09ue203heihduiedwejowiehd');  
        return res.send({name:verify.name,email:verify.email});  
     } catch (error) {
        console.log(error);  
     }
     
}

module.exports={login,authenticate}