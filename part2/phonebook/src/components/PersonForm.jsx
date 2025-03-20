import { useState } from 'react'
import bookService from "../services/phonebook"

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
        number: newNumber
      }
      const exists = persons.some((person) => person.name === newPerson.name)
      
      if (exists) {
        // find existing person object
        const existingPerson = persons.find(person => person.name === newPerson.name)

        // check if new number is same as on server
        if (existingPerson.number === newPerson.number) {
          alert(`${newPerson.name} is already added to phonebook`)
        } else {
          // if new number, check if want to overwrite on server
          if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
            bookService.update({ ...existingPerson, number: newPerson.number })
              .then(updatedPerson => {
                setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
              })
          }
        }
      // if person does not already exist, create
      } else {
        bookService.create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
          })
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

export default PersonForm