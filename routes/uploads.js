const express=require('express');
//const mongodb=require('mongodb');
const db=require('../data/database');
const multer=require('multer');
const router=express.Router(); 
const storageConfig=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'images');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});
const upload=multer({storage:storageConfig});
  
router.get('/new',function(req,res){
    res.render('new-user');
});
router.get('/profile',async function(req,res){
    const users=await db.getDb().collection('users').find().toArray();
    res.render('profile',{users:users});
});
router.post('/profile',upload.single('userimage'),async function(req,res){
    const uploadedImageFile=req.file;
    const userData=req.body;

    await db.getDb().collection('users').insertOne({
        name:userData.username,
        imagePath:uploadedImageFile.path
    })
    res.redirect('/profile');
})
module.exports= router;