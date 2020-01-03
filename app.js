require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//const ejs=require("ejs");
//var session = require('express-session');
//const passport=require("passport");
//const passportLocalMongoose=require("passport-local-mongoose");
//var GoogleStrategy = require('passport-google-oauth20').Strategy;
//const findOrCreate= require("mongoose-findorcreate");

var defclass=[];
var stucoll=[];





const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine' , 'ejs');



// app.use(session({
//   secret: "Our little Secret",
//   resave: false,
//   saveUninitialized: false
//
// }));


// app.use(passport.initialize());
// app.use(passport.session());




mongoose.connect('mongodb://localhost:27017/elearnwgDB', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } );



const UserSchema= new mongoose.Schema ({
  email : {type:String,require:true,unique:true},
  password: {type:String,require:true,unique:true},
  type:String,
  // googleId: String,


});

// UserSchema.plugin(passportLocalMongoose);
// UserSchema.plugin(findOrCreate);


const User=mongoose.model("User", UserSchema);

// passport.use(User.createStrategy());
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });


// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/class",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));



const studentSchema =mongoose.Schema({
    name: String,
    father_name: String,
    addresses: [{
      address: String,
      state:String,
      city: String,
      pincode: Number
    }],
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,unique:true},
    // classtitle: String,
    // classinstructor:String,
    classes:[{
      classtitle: String,
      classinstructor:String,
    }],

});


const Student=mongoose.model("Student", studentSchema);


const classSchema= new mongoose.Schema ({
  title : String,
  description: String,
  instructor: String,


});
//var ObjectId = require('mongodb').ObjectId;
const Class=mongoose.model("Class", classSchema);

const cla= new Class({
  title: "Operating System",
  description: "An operating system (OS) is the program that, after being initially loaded into the computer by a boot program, manages all of the other application programs in a computer. The application programs make use of the operating system by making requests for services through a defined application program interface (API). In addition, users can interact directly with the operating system through a user interface such as a command line or a graphical user interface (GUI).",
  instructor: "Dr Vinay Arora",
});

//cla.save();
const cla1= new Class({
  title: "Computer Networks",
  description: "A computer network is a set of connected computers. Computers on a network are called nodes. The connection between computers can be done via cabling, most commonly the Ethernet cable, or wirelessly through radio waves. Connected computers can share resources, like access to the Internet, printers, file servers, and others. A network is a multipurpose connection, which allows a single computer to do more.",
  instructor: "Dr Sumit Miglani",
});

//cla1.save();

const cla2= new Class({
  title: "Data Structure",
  description: "A data structure is a particular way of organizing data in a computer so that it can be used effectively.For example, we can store a list of items having the same data-type using the array data structure.",
  instructor: "Dr Chunky Pandey",
});

 //cla2.save();


defclass=[cla,cla1,cla2];


const instructorSchema =mongoose.Schema({
    name: String,
    father_name: String,
    addresses: [{
      address: String,
      state:String,
      city: String,
      pincode: Number
    }],
    email:{type:String,require:true,unique:true} ,
    password:{type:String,require:true,unique:true} ,
    classes:[{
      classtitle: String,
      classinstructor:String,
    }],

});
const Instructor=mongoose.model("Instructor", instructorSchema);


var uri=[];

app.get("/", function(req,res){
  res.render("elements",{"dool": defclass });
});

// app.get("*",function(req,res,next){
//   res.locals.user=req.user||null;
//   if(req.user)
//   {
//     req.locals.type=req.users.type;
//   }
// });


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));
//
//   app.get('/auth/google/class',
//     passport.authenticate('google', { failureRedirect: '/register' }),
//     function(req, res) {
//       // Successful authentication, redirect home.
//       res.redirect('/');
//     });


app.get("/register", function(req,res){
  res.render("register");
});




app.get("/classes",function(req,res){
  res.render("classes", {"dool": defclass,info:uri });
});

app.get("/classes/:customname/details",function(req,res){
  var customname =req.params.customname;
 //var o_id = new ObjectId(id);
  //console.log(customname);
  Class.findOne({title: customname},function(err, foundClass){
    if(err)
    {
    console.log(err);
    res.send(err);
  }
    else {
      if(!foundClass)
      console.log("No Class Exist");
      else {
      //  console.log(foundClass.title);
      //console.log(uri.email);
         res.render("details", {"classfd": foundClass, info:uri});
      }

    }
  })
// //  res.send("Hello");
});

app.get("/students/classes",function(req,res){
  console.log(uri.email);
  Student.findOne({email: uri.email},function(err, foundStudents){
  if(!err){
        if(foundStudents)
        {
        //  user.save(function(err){
            if(err)
          //  console.log("error in saving");
            console.log(err);
            else {
              //console.log(user);
            //  console.log(pass);console.log();
          //  console.log(foundStudents);
            res.render("studentclasses",{"classfd":foundStudents});
            //  res.redirect("/");
          }
        }
      }

});
});

app.get("/instructors/classes",function(req,res){
  console.log(uri.email);
  Instructor.findOne({email: uri.email},function(err, foundInstructors){
  if(!err){
        if(foundInstructors)
        {
        //  user.save(function(err){
            if(err)
          //  console.log("error in saving");
            console.log(err);
            else {
              //console.log(user);
            //  console.log(pass);console.log();
          //  console.log(foundInstructors);
            res.render("instructorclasses",{"classfd":foundInstructors});
            //  res.redirect("/");
          }
        }
      }

});
});




app.get("/logout", function(req,res){
  req.logout();
  res.redirect("/");
});



  app.post("/",function(req,res){

 var ema= req.body.user;
var  pass= req.body.password;



User.findOne({password: pass},function(err, foundItems){
if(!err){
      if(!foundItems)
      {
      res.render("register");
    }
      else {
        uri=foundItems;
     console.log(uri._id);
        //console.log(foundItems.name);
        //console.log(foundItems);

          res.redirect("/classes");
      }
    }
    else {
      console.log(err);
      res.render("register");
    }

});
  });



app.post("/register",function(req,res){
var t=req.body.email;
var yu=req.body.type;
  const user= new User({
     email:t,
     password : req.body.password,
     type: req.body.type,
  });
//console.log(yu);
  User.findOne({email: t},function(err, foundItems){
  if(!err){
        if(!foundItems)
        {
          user.save(function(err){
            if(err)
          //  console.log("error in saving");
            console.log(err);
            else {
              //console.log(user);
            //  console.log(pass);
              console.log("Inserted successfuly to user database");
            //  res.redirect("/");
            }
          });

          if(yu=="student"){
            const student= new Student({
              name: req.body.name,
              father_name: req.body.father_name,
              addresses: [{
                address: req.body.address,
                state:req.body.state,
                city: req.body.city,
                pincode: req.body.pincode
              }],
              email: req.body.email,
              password:req.body.password,
            });

            stucoll.push(student);

            student.save(function(err){
              if(err){
            //  console.log("error in saving");
              console.log(err);
                res.send(err);}
              else {
                //console.log(user);
              //  console.log(pass);
                console.log("Inserted successfuly to student  database");
             res.redirect("/");
              }
            });
          }

          if(yu=="instructor"){

            const instructor= new Instructor({
              name: req.body.name,
              father_name: req.body.father_name,
              addresses: [{
                address: req.body.address,
                state:req.body.state,
                city: req.body.city,
                pincode: req.body.pincode
              }],
              email: req.body.email,
              password:req.body.password,
            });
          instructor.save(function(err){
              if(err)
              {
            //  console.log("error in saving");
              console.log(err);
              res.send(err);
            }
              else {
                //console.log(user);
              //  console.log(pass);
                console.log("Inserted successfuly to instructor database");
                res.redirect("/");
              //  res.redirect("/");
              }
            });
          }




      }
        else {
          res.send("Username already exist");
        }
      }
      else {
        console.log(err);
        res.render("register");
      }

  });
    });



app.post("/students/classes/register",function(req,res){
  console.log(req.body.class_title);
  console.log(req.body.class_inst);
  Student.updateOne({email: uri.email},{ $push:{"classes": {classtitle: req.body.class_title, classinstructor : req.body.class_inst}}},function(err){
    if(err){
        console.log("Something wrong when updating data!");
    }
    else{

    console.log("Successfully updated");
    res.redirect("/students/classes");
  }
});
});
//  console.log((email));
//  console.log(pass);

app.post("/instructors/classes/register",function(req,res){
//  console.log(req.body.class_title);
//  console.log(req.body.class_inst);
  Instructor.updateOne({email: uri.email},{ $push:{"classes": {classtitle: req.body.class_title, classinstructor : req.body.class_inst}}},function(err){
    if(err){
        console.log("Something wrong when updating data!");
    }
    else{

    console.log("Successfully updated");
    res.redirect("/instructors/classes");
  }
});
});


app.listen(3000,function()
{
  console.log("Server is running on Port 3000");
});
