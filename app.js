const fs = require("fs");
const express = require('express');
const app = express();
const PORT = 3000;

// middleware untuk membaca json dari request body 
app.use(express.json())

const customers = JSON.parse(
fs.readFileSync(
    `${__dirname}/data/dummy.json`)
);
// localhost:3000
app.get('/', (req, res, next)=>{
    res.send('<p>halo my friend</p>');
});

app.get('/api/v1/customers', (req, res, next)=>{
    res.status(200).json({
        status: "succes",
        totaldata: customers.length,
        data: {
            customers,
        },
    });
});

// const newCustomer = req.body;
// customers.push(newCustomer)

app.post("/api/v1/customers", (req, res)=>{
    
    const newCustomer = req.body;
    customers.push(req.body);
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
        res.status(201).json({
            status: 'success',
            data: {
                customers : newCustomer

            }
        })
    })

    res.send("oke udah");
})

app.listen(PORT, () =>{
    console.log(`APP running on port : ${PORT}`);
});