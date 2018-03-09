import React from 'react'
import { connect } from 'react-redux'

import { update } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  like = anecdote => () => {
    this.props.update(anecdote)
    this.props.notification('you voted \'' + anecdote.content + '\'', 3)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.like(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  }
}

export default connect(mapStateToProps, { update, notification })(AnecdoteList)