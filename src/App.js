import React, { Component } from 'react';
import HanabiGame from './HanabiGame';
import './App.css';

const NUM_PLAYER_OPTIONS = [2, 3, 4, 5];
const GAME_TYPE_OPTIONS = ["Standard", "Multicolored"];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerCount: NUM_PLAYER_OPTIONS[0],
      gameType: GAME_TYPE_OPTIONS[0],
      gameStarted: false
    };
  }

  selectPlayerCount(e) {
    this.setState({ playerCount: parseInt(e.target.innerText, 10) });
  }

  selectGameType(e) {
    this.setState({ gameType: e.target.innerText });
  }
  
  startGame(e) {
    this.setState({ gameStarted: true });
  }

  render() {
    if (this.state.gameStarted) {
      return (
        <div className="app">
          <HanabiGame numPlayers={this.state.playerCount} gameType={this.state.gameType} />
        </div>
      );
    }

    return (
      <div className="app">
        <div className="welcome-message">Welcome to Hanabi Tracker!</div>
        <div className="player-select">
          <div className="player-select-prompt">How many players?</div>
          <div className="player-select-options">
            {NUM_PLAYER_OPTIONS.map(option =>
              <div 
                key={option}
                className={"player-select-option " + (this.state.playerCount === option ? "player-select-option--selected" : "")}
                onClick={e => this.selectPlayerCount(e)}>
                  {option}
              </div>
            )}
          </div>
        </div>
        <div className="game-type-select">
          <div className="game-type-select-prompt">What style of game?</div>
          <div className="game-type-select-options">
            {GAME_TYPE_OPTIONS.map(option =>
              <div
                key={option}
                className={"game-type-select-option " + (this.state.gameType === option ? "game-type-select-option--selected" : "")}
                onClick={e => this.selectGameType(e)}>
                  {option}
              </div>
            )}
          </div>
        </div>
        <button className="game-start" onClick={e => this.startGame(e)}>Start Game!</button>
      </div>
    );
  }
}

export default App;
