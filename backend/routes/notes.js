const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { json } = require('express');
const { body, validationResult } = require('express-validator');



//  route 1  : Get all notes : GET "/api/notes/fetchallnotes". login  require // 1st end point
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }) //get all user notes
        res.json(notes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//  route 2  : Add a new note : POST "/api/notes/addnote". login  require // 2nd end point
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid Title').isLength({ min: 5 }),
    body('descriptipon', 'Descriptipon  must be mininum 5 characters'),], async (req, res) => {
        try {
            const { title, description, tag } = req.body
            //if there are error return bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({ //creating a note returns promise
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save() //returns note
            res.json(savedNote)

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//  route 3  : Update the existing  note : PUT "/api/notes/updatenote". login  require // 3rd end point
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        //create a new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find the note to updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found") }

        //Allow update if user owns this note
        if (note.user.toString() !== req.user.id) { //if some logged in user is trying to update some else note
            return res.status(401).send("You are  Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //1st it takes id, set newnote and new true if new note then it will add it
        res.json(note);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//  route 4  : Delete the existing  note : DELETE "/api/notes/deletenote". login  require // 4th end point
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        //find the note to delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found") }

        //Allow deletion if user owns this note
        if (note.user.toString() !== req.user.id) { //if some logged in user is trying to update some else note
            return res.status(401).send("You are  Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id); //1st it takes id, set newnote and new true if new note then it will add it
        res.json({"Success": "Note has been deleted",note:note});


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router