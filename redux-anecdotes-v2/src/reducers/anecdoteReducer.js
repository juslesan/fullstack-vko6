import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='UPDATE') {
    const old = store.filter(a => a.id !==action.anecdote.id)

    return [...old, action.anecdote ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.content]
  }
  if (action.type === 'INITIALIZE') {
    return action.anecdotes
  }

  return store
}

export const update = anecdote => {
  return async dispatch => {
    const result = await anecdoteService
      .update({ ...anecdote, votes: anecdote.votes + 1 })

    dispatch({
      type: 'UPDATE',
      anecdote: result
    })
  }
}

export const create = content => {
  return async dispatch => {
    const anecdote = await anecdoteService
      .save({ content: content, votes: 0 })

    dispatch({
      type: 'CREATE',
      content: anecdote
    })
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService
      .getAll()

    dispatch({
      type: 'INITIALIZE',
      anecdotes
    })
  }
}

export default reducer