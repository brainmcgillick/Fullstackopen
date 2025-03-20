import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import bookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  
  const hook = () => {
    bookService.getAll()
      .then(people => setPersons(people))
  }

  useEffect(hook, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      bookService.deletePerson(id)
        .then(response => {
            setPersons(persons.filter(person => person.id !== id))
          })
    }
  }

  const [filterName, setFilterName] = useState("")

  const displayNames = filterName === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <PersonForm persons={persons} setPersons={setPersons}/>
      <Persons persons={displayNames} deletePerson={deletePerson} />
    </div>
  )
}

export default App
