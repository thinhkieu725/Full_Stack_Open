import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

const Search = ({newSearch, handleNewSearch}) => {
  return (
    <form>
      filter shown with <input value={newSearch} onChange={handleNewSearch}/>
    </form>
  )
}

const Numbers = ({persons, handleDeletePerson}) => {
  return (
    <table>
      <tbody>
      {
      persons.map(person => {
        return (
        <tr key={person.id}>
          <td><p key={person.id}>{person.name} {person.number}</p></td>
          <td><button onClick={handleDeletePerson(person.id, person.name)}>delete</button></td>
        </tr>
        )
      })
      }
      </tbody>
    </table>
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

    const alreadyStoredPerson = persons.find(person => person.name === newName)
    if (alreadyStoredPerson != undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
        .changeNumber(alreadyStoredPerson, newNumber)
        .then(changedPerson =>{
          setPersons(persons.map(person => {
            if (person.name === changedPerson.name) return changedPerson
            else return person
          }))
        })
      setNewName('')
      setNewNumber('')
      }
    }
    else {
      let newPerson = {
        name: newName,
        number: newNumber,
      }
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletePerson = (id, name) => {
    return ( () => {
      if (window.confirm(`Delete ${name} ?`)) {
        phonebookService
          .remove(id)
          .then(deletedPerson => {
            setPersons(persons.filter((person) => person.id !== id));
            console.log(deletedPerson)
          })
        }
    })
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
      <Numbers persons={personsToShow} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App