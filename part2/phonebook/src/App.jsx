import { useEffect, useState } from 'react'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

import phonebookService from "./services/phonebook"

import "./App.css"

const Person = ({ person, onDeleteClicked }) => 
  <li>
    {person.name} {person.number}
    <button onClick={onDeleteClicked}>delete</button>
  </li>

const PersonForm = ({ newName, newNumber, onFormSubmitted, onNameChange, onNumberChange }) => 
  <form name={'person form'}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={onFormSubmitted}>add</button>
    </div>
  </form>

const Persons = ({ persons, deleteFromPhonebook }) => { 
  return (
    <ul>
      {persons.map((person) => 
        <Person key={person.name} person={person} onDeleteClicked={() => deleteFromPhonebook(person)}/>
      )} 
    </ul>
  )
}

const Filter = ({ nameFilter, onChange }) => 
  <form name={'person filter'} onSubmit={(event) => event.preventDefault()}>
    <div>
      filter shown with: <input value={nameFilter} onChange={onChange} />
    </div>
  </form>

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState(0)
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const updateNameInput = (event) => setNewName(event.target.value)
  const updateNumberInput = (event) => setNewPhoneNumber(event.target.value)
  const updateNameFilter = (event) => setNameFilter(event.target.value)

  useEffect(() => {
    phonebookService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addToPhonebook = (event) => {
    event.preventDefault()

    if (newName === '') {
      alert('Cannot input empty name into phonebook')
      return
    }

    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }

    if (!existingPerson) {
      phonebookService.addToPhonebook(newPerson).then(updatedData => {
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => setSuccessMessage(null), 3000)

        setPersons([...persons, updatedData])  
        setNewName('')
        setNewPhoneNumber(0)
      })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      phonebookService.modifyPhonebook(existingPerson.id, newPerson).then(updatedData => {
        setSuccessMessage(`Modified ${newName}`)
        setTimeout(() => setSuccessMessage(null), 3000)

        setPersons(persons.map(otherPerson => otherPerson.id === existingPerson.id ? updatedData : otherPerson))
        setNewName('')
        setNewPhoneNumber(0)
      })
    }
  }

  const deletePerson = (person) => {
    const { id, name } = person
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }

    phonebookService.deleteFromPhonebook(id).then(() => {
      setPersons(persons.filter(otherPerson => otherPerson.id !== id))
    }).catch(() => {
      setErrorMessage(`Information about ${name} has already been removed from server`)
      setTimeout(() => setErrorMessage(null), 3000)
      setPersons(persons.filter(otherPerson => otherPerson.id !== id))
    })
  }

  const readingPhonebooks = nameFilter === '' ? persons : persons.filter(person => person.name.split(' ')[0] === nameFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      <Filter nameFilter={nameFilter} onChange={updateNameFilter}/>

      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newPhoneNumber} onFormSubmitted={addToPhonebook} onNameChange={updateNameInput} onNumberChange={updateNumberInput} />

      <h3>Numbers</h3>
      <Persons persons={readingPhonebooks} deleteFromPhonebook={deletePerson}/> 
    </div>
  )
}

const App = () => {
  return (
    <>
      <Phonebook />
    </>
  )
}

export default App