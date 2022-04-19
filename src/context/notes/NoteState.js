
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Fetch all notes
  const getNotes = async () => {
    //todo api call backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YTljYzBiZTQxNTBiMGUzOGZkODM0In0sImlhdCI6MTY0OTA2MTAyOX0.dMdGLM18NF_DM22uhfb9QHLCwmQIiLHDM27eKIHU2yI'
      },

    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //todo api call backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YTljYzBiZTQxNTBiMGUzOGZkODM0In0sImlhdCI6MTY0OTA2MTAyOX0.dMdGLM18NF_DM22uhfb9QHLCwmQIiLHDM27eKIHU2yI'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))//add a note, note ko note array mai push kardo and update note state
   

  
    //concat return an array and push update array
  }

  //Delete a note
  const deleteNote = async (id) => {
    // api call backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YTljYzBiZTQxNTBiMGUzOGZkODM0In0sImlhdCI6MTY0OTA2MTAyOX0.dMdGLM18NF_DM22uhfb9QHLCwmQIiLHDM27eKIHU2yI'
      }
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting a node with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id }) //note._id nahi hai barabar id ke toh woh rahenga under warna nhi rahega
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // api call backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0YTljYzBiZTQxNTBiMGUzOGZkODM0In0sImlhdCI6MTY0OTA2MTAyOX0.dMdGLM18NF_DM22uhfb9QHLCwmQIiLHDM27eKIHU2yI'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes= JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    //  <NoteContext.Provider value={{state,update}}>
    //      {props.children}
    //  </NoteContext.Provider>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;