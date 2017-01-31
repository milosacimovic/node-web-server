const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('Unable to append to file');
    }
  });
  next();
});

app.use(express.static(`${__dirname}/public/`));
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hello there!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.listen(port, () =>{
  console.log(`Server started at ${port}`);
});
