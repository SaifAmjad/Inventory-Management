let sql = require("mssql/msnodesqlv8");

var config = {
    server: 'DESKTOP-NVU9K8T\\SQLEXPRESS', 
    database: 'master',
    driver:'msnodesqlv8',
    options:{
        trustedConnection:true
    }
};

const getProducts=(req,res)=>{
    
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();
           
        request.query('SELECT * FROM Products', function (err, recordset) {
            if (err){
             return res.send(err);
            }  
            res.send(recordset.recordset);
        });
    });
}

const postProducts=(req,res)=>{

    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        console.log(req.body) 
        const request = new sql.Request();        
        request.query(`INSERT INTO Products VALUES(${Number(req.body.id)},'${req.body.name}',${Number(req.body.price)},${Number(req.body.quantity)},'${req.body.sku}','${req.body.catagory}',${Number(req.body.cost)});`, function (err, recordset) {
            if (err){
            console.log(err);
             return res.send(err);
            } 
            res.send(recordset);
        });
    });
}

const editProducts=(req,res)=>{
    

    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();        
        request.query(`UPDATE Products
        SET Name='${req.body.name}',Price=${Number(req.body.price)},Quantity=${Number(req.body.quantity)},Sku='${req.body.sku}',Catagory='${req.body.catagory}',Cost=${Number(req.body.cost)}
        WHERE Product_Id=${Number(req.body.id)};`, function (err, recordset) {
            if (err){ 
                console.log(err)
             return res.send(err);
            }  
            res.send(recordset);
        });
    });

    
}

const deleteProduct=(req,res)=>{
    sql.connect(config, function (err) {
    
        if (err){
            console.log(err);
        } 

        const request = new sql.Request();        
        request.query(`DELETE Products
        WHERE Product_Id=${Number(req.body.id)} ;`, function (err, recordset) {
            if (err){ 
                console.log(err)
             return res.send(err);
            }  
            res.send(recordset);
        });
    });
}

module.exports={getProducts,postProducts,editProducts,deleteProduct}