const express=require('express');
const path=require('path');
const fileuploads=require('./routes/uploads')
const db=require('./data/database')
const app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/images',express.static('images'));
app.use(express.urlencoded({extended: true}));

app.use('/',fileuploads);
let port=3500;

db.connectToDatabase().then(function(){
    app.listen(port,function(){
        console.log('sever has started')
        console.log('connected succesfull');
    });
}).catch(function(error){
    console.log('Failed to connect to the database');
    console.log(error);
});
