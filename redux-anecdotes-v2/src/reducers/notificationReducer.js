const startNotification = ''

const anecdoteReducer = (state = startNotification, action) => {
  switch(action.type) {
  case 'SET': return action.notification
  case 'UNSET': return ''
  default: return state
  }
}

export const setNote = notification => ({
  type: 'SET',
  notification
})

export const unsetNote = () => ({
     type: 'UNSET' 
    })

export const notification = (message, time) => {
  return async dispatch => {
    dispatch(setNote(message))
    
    await new Promise(resolve => {
        setTimeout(resolve, 1000 * time)
    })

    dispatch(unsetNote())
  }
}

export default anecdoteReducer