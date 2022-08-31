const express = require("express");
const {updateNoteController, getNoteController,getAllNotesController,createNotesController ,deleteNoteController } = require("../controller/noteController");
const verifyUser = require("../middleware/authMiddleWare");
const NoteRouter = express.Router();
// const verifyUser = require("../middleware/authMiddleWare")

NoteRouter.get("/",verifyUser,getAllNotesController )
NoteRouter.get("/user", (req,res) =>{
    res.send('hhhhh')
})
NoteRouter.post("/create", verifyUser, createNotesController)
NoteRouter.delete("/single/delete/:id", verifyUser, deleteNoteController)
NoteRouter.put("/single/update/:id",verifyUser, updateNoteController)
NoteRouter.get("/single/:id", verifyUser, getNoteController)


module.exports = NoteRouter;