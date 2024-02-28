import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

const Search = ({newSearch, handleNewSearch}) => {
  return (
    <form>
      filter shown with <input value={newSearch} onChange={handleNewSearch}/>
    </form>
  )
}

const Numbers = ({persons}) => {
  return (
    <div>
    {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

const AddPersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <ul>
        <li>name: <input value={newName} onChange={handleNameChange}/></li>
        <li>number: <input value={newNumber} onChange={handleNumberChange}/></li>
      </ul>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName) != undefined) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      let newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      console.log(persons)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const personsToShow = newSearch == ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h2>add a new</h2>
      <AddPersonForm newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} />
    </div>
  )
}

export default App