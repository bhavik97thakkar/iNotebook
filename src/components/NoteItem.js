import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext); //usign use context
    const { deleteNote  } = context;//destructing
    const { note,updateNote } = props;
    return (
        <div className='col-md-6'>
            <div className="card my-3">
                <div className="card-body my-3">
                    <div className='d-flex justify-content-between p-2'>
                    <h5 className="card-title " style={{wordWrap:'break-word'}}>{note.title}</h5>
                    <p className="badge bg-info" style={{float:"right",height:"24px",textAlign:"center",}}>{note.tag}</p>
                    </div>
                    <p className="card-text mx-2"  id='carddesc' style={{wordWrap:'break-word'}} >{note.description}</p>
                    <p className="badge bg-primary my-2 mx-2" onClick={()=>{updateNote(note)}} style={{float:"left"}}><i className="fa-solid fa-pen-to-square mx-2 my-1"></i></p>  
                    <p className="badge bg-danger my-2 mx-3"  onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success")}} style={{float:"left"}}><i className="fa-solid fa-trash mx-2 my-1"></i></p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
