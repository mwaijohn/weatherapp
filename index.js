const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
 })

//  app.get('/', (req, res) => {
//     res.render('index');
//  })

app.get('/home',(req,res)=>{
    res.render('home')
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running ")
})