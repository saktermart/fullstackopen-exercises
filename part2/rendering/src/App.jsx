import Note from "./components/Note"

const Notes = ({ notes }) => {
  return (
    <>
      <h1>Notes</h1>  
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </>
  )
}
const App = () => {
  const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
    },

    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },

    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    },
  ]
  
  return (
    <>
      <div>
        <Notes notes={notes} />    
      </div>     
    </>
  )
}

export default App
