let sql = require("mssql/msnodesqlv8");

var config = {
    server: 'DESKTOP-NVU9K8T\\SQLEXPRESS', 
    database: 'master',
    driver:'msnodesqlv8',
    options:{
        trustedConnection:true
    }
};


const getCustomers=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();
           
        request.query('SELECT * FROM Customers', function (err, recordset) {
            if (err){
             return res.send(err);
            }   
            res.send(recordset.recordset);
        });
    });
}

const createCustomer=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        let value;
        let randomId;
        const request = new sql.Request();     
        request.query('SELECT * FROM Customers', function (err, recordset) {
            if (err){
             return res.send(err);
            }   
            value=recordset.recordset;
           
            if(value.length===0){
                randomId=0o540;
            }
            else{
                const prev=value[value.length-1].CustomerId;
                randomId=prev+1;
            }

            request.query(`
            INSERT INTO Customers VALUES(${Number(randomId)},'${req.body.firstname}','${req.body.lastname}',${Number(req.body.age)},'${req.body.email}','${req.body.phone}');`, function (err, recordset) {
                if (err){
                console.log(err);
                 return res.send(err);
                }  
                res.send(recordset);
            });
            
        });   
        
    });
}

const editCustomers=(req,res)=>{
    const id=req.params.id;

    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();        
        request.query(`UPDATE Customers
        SET FirstName='${req.body.firstname}',LastName='${req.body.lastname}',Age=${Number(req.body.age)},Email='${req.body.email}',Phone='${req.body.phone}'
        WHERE CustomerId=${Number(id)};`, function (err, recordset) {
            if (err){ 
                console.log(err)
             return res.send(err);
            }  
            res.send(recordset);
        });
    });

    
}

const deleteCustomer=(req,res)=>{

    const id=req.params.id
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();        
        request.query(`DELETE Customers
        WHERE CustomerId=${Number(id)} ;`, function (err, recordset) {
            if (err){ 
                console.log(err)
             return res.send(err);
            }  
            res.send(recordset);
        });
    });
}

module.exports={getCustomers,createCustomer,editCustomers,deleteCustomer}