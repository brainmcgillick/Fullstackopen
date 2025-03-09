import { useState, useEffect } from 'react'
import axios from "axios"
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log("effect")
    axios
    .get("http://localhost:3001/notes")
    .then(response => {
      console.log("promise fulfilled")
      setNotes(response.data)
    })
  }
  
  useEffect(hook, [])
    
  // if showAll = true, then notesToShow = notes, otherwise notesToShow is notes filtered to important only
  const notesToShow = showAll
    ? notes
    // filter returns true evaluations only so note.important will be returned in the new array
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => {
          return (
          <Note key={note.id} note={note} />
        )
        })}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
