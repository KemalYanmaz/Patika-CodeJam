const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const userRoute = require('./routes/userRoute');
const pageRoute = require('./routes/pageRoute');
const projectRoute = require('./routes/projectRoute');
const blogpostRoute = require('./routes/blogpostRoute');

const app = express();

// Global Variable
global.userIN = null;


// DB CONNECTION
const dbString =
  'mongodb+srv://grouph:HCPk4wnz7qKbdLOV@cluster0.gf06m.mongodb.net/Codejam-GroupH?retryWrites=true&w=majority';
mongoose
  .connect(dbString)
  .then(() => {
    console.log('Db Connected Succesfully');
  })
  .catch((error) => {
    console.log(error);
  });


// TEMPLATE ENGINE
app.set('view engine', 'ejs');

  
// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'codejam-groupH',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbString }),
  })
);
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);



// ROUTES
app.use('*', (req, res, next) => {
  (userIN = req.session.userID), next();
});
app.use('/', pageRoute);
app.use('/users', userRoute);
app.use('/project', projectRoute);
app.use('/blogposts', blogpostRoute);




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} baslatildi`);
});
