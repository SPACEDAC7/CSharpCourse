import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { values : []}
  }

  componentDidMount() {
    this.doCall()
  }


  doCall() {
    console.log('we are going to call');
    fetch(
        'https://localhost:44356/api/values',
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        .then(values => {
          console.log(values)
          this.setState( {values : values});
        });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <button onClick={() => this.doCall()}>Press here</button>
        <hr></hr>
        {this.state.values.map( x => {
          return (<button key={x.id}>{x.name}</button>);
          })}
      </div>
    );
  }
  }

export default App;
