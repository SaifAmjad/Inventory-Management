require('dotenv').config();
const express = require('express');
const cors=require('cors');
const productRoute=require('./routes/products');
const orderRoute=require('./routes/orders');
const customerRoute=require('./routes/customers');
const userRoute=require('./routes/user');
const cookie=require('cookie-parser');
const app = express();

app.use(cookie());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
  }));

app.use(express.json());

app.use('/products',productRoute);
app.use('/orders',orderRoute);
app.use('/customers',customerRoute);
app.use('/signup',userRoute);




app.listen(5000, ()=> {
    console.log('Listening on port 5000...');
});