import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.setFilter(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10,
      marginTop: 10
    }

    return (
      <div style={style}>
        Search bar: <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(null, { setFilter })(Filter)