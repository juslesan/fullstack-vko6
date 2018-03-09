import React from 'react'
import {BrowserRouter as Router,
  Route, Link, Redirect, NavLink} from 'react-router-dom'
import {Navbar, NavItem, Nav, ControlLabel, Button, ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap'

const Menu = () => ( 
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand style={{fontWeight: 'bold'}}>
          Software anecdotes
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav style={{float: 'right'}}>
          <NavItem href="/anecdotes" >
            Anecdotes</NavItem> &nbsp;
          <NavItem href="/create" >
            Create</NavItem> &nbsp;
          <NavItem href="/about" >
            About</NavItem> &nbsp;
      </Nav>  
    </Navbar.Collapse>
  </Navbar>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
        {anecdotes.map(anecdote=>
           <ListGroupItem key={anecdote.id}>
             <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content}</Link>
           </ListGroupItem>
        )}    
    </ListGroup>  
  </div>
)
const Anecdote = ({anecdote}) => (
  <div>
      {console.log(anecdote)}

    <h2>{anecdote.content + " by " + anecdote.author}</h2>
    <div className= "rounded" style={{border: '2px solid blue', borderRadius: 4, padding: 4, margin: '5px 3px', fontWeight: 'bold'}}>
      <p>has {anecdote.votes} votes,</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
    </div>
  </div> 
)
const Notification = ({notification}) =>
  notification ? <div style={{border: '2px solid blue', borderRadius: 4, padding: 4, margin: '5px 3px', color: 'blue', fontStyle:'oblique'}}>  
  {notification} </div> : null

const About = () => (
  <Grid>
    <Row className="showGrid">
      <h2>About anecdote app</h2>
    </Row>
    <Row className="showGrid">
      <Col xs={7}>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col xs={3} md={4}>
        <img width="210" src="https://upload.wikimedia.org/wikipedia/en/0/08/Richard_Hamming.jpg" alt="Hamming">
        </img>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div style={{backgroundColor: 'lightblue', padding: 4, marginTop: 35, fontStyle:"italic"}}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.setNotification('Anecdote '+this.state.content+' created')
    this.props.history.push('/anecdotes')
  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <br/>
            <ControlLabel>Content:</ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            <br/>
            <ControlLabel>Author:</ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            <br/>
            <ControlLabel>Url for more info: </ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
            <br/>
            <Button bsStyle="success">create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  setNotification = (message, time = 10000) => {
    this.setState({notification: message})
    setTimeout(() => {
      this.setState({notification: null})
    }, time)
  }

  render() {
    return (
      <div className="container">
        {/* <h1>Software anecdotes</h1> */}
        <Router>
          <div>
          <Menu anecdotes={this.state.anecdotes}
                addNew={this.addNew}
                />
            <Notification notification={this.state.notification}/>

            <Route exact path="/create" render={({history}) =>  <CreateNew history={history} addNew={this.addNew} setNotification={this.setNotification}/>} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/about" render={({match}) => <About /> } />
            <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)}/>
              }/>
          </div>
        </Router>   
        <Footer />
      </div>

     
    );
  }
}

export default App;
