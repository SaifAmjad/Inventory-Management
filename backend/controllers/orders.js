let sql = require("mssql/msnodesqlv8");

var config = {
    server: 'DESKTOP-NVU9K8T\\SQLEXPRESS', 
    database: 'master',
    driver:'msnodesqlv8',
    options:{
        trustedConnection:true
    }
};
 
const getOrders=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();
           
        request.query('SELECT * FROM Orders', function (err, recordset) {
            if (err){
             return res.send(err);
            }  
            
            res.send(recordset.recordset);
        });
    });
}

const postOrders=async(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request(); 
        let oid; 

        request.query('SELECT * FROM Orders', function (err, recordset) {
            if (err){
             return res.send(err);
            }  
            const len=recordset.recordset.length-1;
    
            if(len<0){
                oid='1000';
            }
            else{
                oid=++(recordset.recordset[len].Order_Id);
            }
            

            request.query(`INSERT INTO Orders VALUES(${Number(oid)},${Number(req.body.pid)},'${req.body.pname}',${Number(req.body.cid)},'${req.body.cname}',${Number(req.body.quantity)});`, function (err, recordset) {
                if (err){
                 return res.send(err);
                } 
                
                res.send(recordset);
            });
        })
       
       
    });
}

const deleteOrders=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();
           
        request.query(`DELETE Orders Where Order_Id=${Number(req.body.id)}`, function (err, recordset) {
            if (err){
             return res.send(err);
            }  
            
            res.send(recordset);
        });
    });
}

const orderComplete=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();
           
        request.query('SELECT * FROM Complete_Orders', function (err, recordset) {
            if (err){
             return res.send(err);
            }  
            
            res.send(recordset.recordset);
        });
    });
}

const postComplete=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        let cid;

        const request = new sql.Request();

        request.query('SELECT * FROM Complete_Orders', function (err, recordset) {
            if (err){
             return res.send(err);
            }  
            const len=recordset.recordset.length-1;
    
            if(len<0){
                cid='1';
            }
            else{
                cid=++(recordset.recordset[len].Complete_id);
            }

            const currentDate=new Date();
            const dateId=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();

           
                
                request.query(`INSERT INTO Complete_Orders VALUES(${Number(cid)},${Number(req.body.oid)},${Number(req.body.pid)},'${req.body.pname}',${Number(req.body.custom_id)},${Number(req.body.quantity)},'${dateId}');`, function (err, recordset) {
                    if (err){
                     return res.send(err);
                    }  
                    
                    request.query(`DELETE FROM Orders Where Order_Id=${Number(req.body.oid)};`, function (err, recordset) {
                        if (err){
                            console.log(err);
                         return res.send(err);
                        }  

                        res.send(recordset);
                    });
                });
    
           
        });
           
       
    });
}

module.exports={getOrders,postOrders,deleteOrders,orderComplete,postComplete}