import { useState, useEffect } from 'react'
import axios from "axios"

const Persons = ({persons}) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </>
  )
}

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const exists = persons.some((person) => person.name === newPerson.name)
    if (exists) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
    </>
  )
}

const Filter = ({filterName, setFilterName}) => {
  const handleNewFilterName = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <>
      filter shown with <input value={filterName} onChange={handleNewFilterName}/>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  
  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        const people = response.data
        setPersons(people)
      })
  }

  useEffect(hook, [])

  const [filterName, setFilterName] = useState("")

  const displayNames = filterName === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <PersonForm persons={persons} setPersons={setPersons}/>
      <Persons persons={displayNames} />
    </div>
  )
}

export default App
