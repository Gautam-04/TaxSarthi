const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./Config/connect');
const cors = require('cors');
const User = require('./Models/Person');
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the backend server for the TaxSaarthi");
});

app.post("/signup", (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user)
    )
    .catch((err) => res.json(err));
});

app.post("/login" , (req,res)=>{
  const {email,password} = req.body;
  User.findOne({email: email})
  .then(user =>{
    if(user){
      if(user.password === password){
        res.json("Success")
      } else{
        res.json("Password is incorrect")
      }
    } else{
      res.json("No record exists")
    }
  })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});

