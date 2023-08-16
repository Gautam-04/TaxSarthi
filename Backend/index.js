import express from 'express';
import "dotenv/config";

const app = express();
const port = process.env.PORT_NUMBER;

app.get("/",(req,res)=>{
    res.send("This is the backend server for the TaxSaarthi");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})