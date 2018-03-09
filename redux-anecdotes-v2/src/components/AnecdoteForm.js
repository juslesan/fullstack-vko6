import React from 'react'
import { connect } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    this.props.create(content)
    this.props.notification('You added \'' + content + '\'' + ' to the list of anecdotes', 3)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { create, notification })(AnecdoteForm)