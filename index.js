const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Chat = require('./models/chat.js');
const methodOverride = require("method-override");
const path = require('path');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.set("view engine","ejs"); // EJS setting
app.set("views",path.join(__dirname,"views")); // setting views path
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/" , (req,res)=>{
  res.send('working');
});

app.get("/chats", async(req,res)=>{
  let allchats= await Chat.find();
  res.render("index.ejs",{allchats});
})

app.get("/chats/new" , (req,res)=>{
  res.render("new.ejs");
})

app.post("/chats" , (req,res)=>{
  let {from,to,msg} = req.body;
  let newChat= new Chat({
    from:from,
    to:to,
    message:msg,
    createdAt:new Date(),
  });
  // console.log(newChat);
  // res.send("working");
  newChat.save().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
  res.redirect('/chats');
})

app.get("/chats/:id/edit" , async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

app.put("/chats/:id" , async(req,res)=>{
  let {id} = req.params;
  let {message} = req.body;
  console.log(message);
    let newchat = await Chat.findByIdAndUpdate(id,{message:message},{runValidators:true,new:true});
    console.log(newchat);
    res.redirect("/chats");
})

app.delete("/chats/:id" , async(req,res)=>{
  let {id} = req.params; 
  let deletedchat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");

})

app.listen(8080 , ()=>{
  console.log('listening on port 8080');
})

main().then(()=>{
    console.log("connection successfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}


// const user1 = new User({
//   name:"Husain",
//   email:"husainafser1@gmail.com",
//   age:23,
// });

// user1.save().then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// }) 

//  User.insertMany([
//   {name:'Qusai',email:'qudai@gmail.com',age:23},
//   {name:'Qasim',email:'Qqsim@gmail.com',age:20},
//  ]).then((res)=>{console.log(res)}); 

// User.find({age:{$lt:22}}).then((res)=>{
//     console.log(res);
//   }).catch((err)=>{
//     console.log(err);
//   }) 