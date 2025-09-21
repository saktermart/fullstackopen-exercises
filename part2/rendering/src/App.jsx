import { useEffect, useState } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

import noteService from './services/notes'
import './App.css'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)//'Whoops! Something wrong happened')

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id)
    const newNote = { ...note, important: !note.important }

    noteService.update(id, newNote)
      .then(updatedNote => {
        setNotes(notes.map(otherNote => otherNote.id === id ? updatedNote : otherNote))
      })
      .catch(() => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(otherNote => otherNote.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject).then(newNote => {
      setNotes([...notes, newNote])
      setNewNote('')
    })
  }
  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <>
      <h1>Notes</h1>  
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all' }
        </button>
      </div>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </>
  )
}

const App = () => {
  return (
    <>
      <div>
        <Notes />    
        <Footer />
      </div>     
    </>
  )
}

export default App
