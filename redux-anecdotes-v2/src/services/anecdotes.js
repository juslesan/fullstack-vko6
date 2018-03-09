import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(url)
    .then(result => result.data)
}

const update = anecdote => {
  return axios.put(url + '/' + anecdote.id, anecdote)
    .then(result => result.data)
}

const save = anecdote => {
  return axios.post(url, anecdote)
    .then(result => result.data)
}

export default { getAll, save, update }