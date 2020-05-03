import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    console.log("Constructor running");
    super();
    this.state = {
      players: [],
      personText: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch(`http://localhost:5000/api/players`)
      .then(res => res.json())
      .then(persons => {
        console.log("Players: ", persons);
        this.setState({ players: persons.message });
      })
      .catch(err => {
        console.log("Err: ", err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");

    // update the state
    if (prevState.players !== this.state.players) {
      console.log("New Players!");
    }
  }

  handleChanges = e => {
    this.setState({ personText: e.target.value });
    console.log("this.state.personText: ", this.state.personText);
  };

  render() {
    console.log("Rendering");
    // console.log(this.state);
    return (
      <div>
        <h1>Hello Players!</h1>
        <input
          type="text"
          value={this.state.personText}
          onChange={this.handleChanges}
        />
        <button onClick={this.fetchPlayers}>Enter</button>
        <div className="players">
          {this.state.players.map(person => (
            <img width="200" src={person} key={person} alt={person} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
