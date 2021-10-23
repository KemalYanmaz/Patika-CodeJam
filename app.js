const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');

const app = express();

// Db Connection
const dbString =
  'mongodb+srv://grouph:HCPk4wnz7qKbdLOV@cluster0.gf06m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(dbString)
  .then(() => {
    console.log('Db Connected Succesfully');
  })
  .catch((error) => {
    console.log(error);
  });

// Middlewares
app.use(express.static('public'));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded



// Routes
app.get('/', (req,res) => {
  res.status(200).send('It works')  
})

app.use('/users', userRouter);


const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} baslatildi`);
});
