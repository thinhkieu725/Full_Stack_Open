import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const changeNumber = (person, newNumber) => {
    const url = `${baseUrl}/${person.id}`
    const changedPerson = {...person, "number": newNumber}
    const request = axios.put(url, changedPerson)
    return request.then(response => response.data)
}

export default {getAll, create, remove, changeNumber}