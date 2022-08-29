const asyncHandler = require('express-async-handler');
const MernNote = require('../model/notesModel');

const getAllNotesController = asyncHandler(async(req,res)=>{
    const notes = await MernNote.find({user: req.user._id})
        res.status(200).json(notes)
})
const getNoteController = asyncHandler(async(req,res)=>{
    const {id} = req.params
    console.log("Starting Page: ", id);
    const note = await MernNote.findOne({_id : req.params.id})
    console.log("Starting Page 6556: ", note);
    if (note) {
        res.status(200).json({success: true , message: note});
      } else {
        res.status(404).json({ message: "Note not found" });
      }
})
const deleteNoteController = asyncHandler(async(req,res)=>{
    const {id} = req.params
    
    const note = await MernNote.findOne({_id:id})
   
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
      }

    if (note) {
        await note.remove();
    res.status(200).json({ message: "Note Removed" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
})
const updateNoteController = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const { title, content, category } = req.body;
    const note = await MernNote.findOne({id})
    // if (note.user.toString() !== req.user._id.toString()) {
    //     res.status(401);
    //     throw new Error("You can't perform this action");
    //   }
      
    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;
    
        const updatedNote = await note.save();
        res.json(updatedNote);
       
    res.json({ message: "Note Removed" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
})

const createNotesController = asyncHandler(async(req,res)=>{
    const {title, content,category} = req.body
    if(!title || !content || !category){
         res.status(400);
        throw new Error("Please Fill all the feilds");
        return
    }
    else{

        const newNotes = await MernNote.create({
            title,
            content,
            category,
            user : req.user._id
        })
       return  res.status(201).json({success: true,
        message: newNotes})
    }
})


module.exports={getAllNotesController,deleteNoteController,getNoteController,createNotesController,updateNoteController }