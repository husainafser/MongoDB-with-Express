const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(()=>{
    console.log("connection successfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}

let allChats = [
    {
        from:"Qasim",
        to:"Afser",
        message:"Hey where You",
        createdAt: new Date(),
    },
    {
        from:"Afser",
        to:"Qusai",
        message:"Going to shop",
        createdAt: new Date(),
    },
    {
        from:"Qadir",
        to:"Qasim",
        message:"Send me credentials",
        createdAt: new Date(),
    },
    {
        from:"Qusai",
        to:"Qadir",
        message:"On my way",
        createdAt: new Date(),
    },
    
]

Chat.insertMany(allChats)
