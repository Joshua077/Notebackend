const express = require('express');
const notes = require('./data/notes');
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoute');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const NoteRouter = require('./routes/notesRoute');
require('dotenv').config();



app.use(express.json());


app.get("/", (req,res) =>{
    res.send("Hello World")
})

app.get("/api/notes", (req,res)=>{
    res.json({message: "Success!",
notes})
})

app.get("/api/notes/:id", (req,res)=>{
    const id = req.params.id;
    const note = notes.find((x) => x._id === id);
    res.json({message:"Success!", note})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/notes', NoteRouter)
app.use(notFound)
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URI).then((res)=>
console.log("connecct")).catch((err)=>console.log("error 2",err.message));
const PORT = process.env.PORT
app.listen(PORT, console.log("server started on port 5000"))