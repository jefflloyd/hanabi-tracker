import React, { Component } from 'react';
import HanabiCard from './HanabiCard';
import './HanabiGame.css';

class HanabiGame extends Component {
  constructor(props) {
    super(props);

    this.numCardsPerPlayer = this.props.numPlayers < 4 ? 5 : 4;
    this.includeMulticolored = this.props.gameType === 'Multicolored';

    this.cardCount = 0;
    this.state = {
      cards: []
    };

    for (let i = 0; i < this.numCardsPerPlayer; i++) {
      this.state.cards.push(
        <HanabiCard
          key={this.cardCount}
          position={i}
          includeMulticolored={this.includeMulticolored}
          handleCardDelete={position => this.handleCardDelete(position)}
        />
      );
      this.cardCount++;
    }
  }

  handleCardDelete(position) {
    const newCards = this.state.cards.map(card => {
      const oldPosition = card.props.position;

      if (parseInt(card.props.position, 10) < position) {
        return (
          <HanabiCard
            key={card.key}
            position={oldPosition}
            includeMulticolored={this.includeMulticolored}
            handleCardDelete={position => this.handleCardDelete(position)}
          />
        );
      } else if (parseInt(card.props.position, 10) > position) {
        return (
          <HanabiCard
            key={card.key}
            position={oldPosition - 1}
            includeMulticolored={this.includeMulticolored}
            handleCardDelete={position => this.handleCardDelete(position)}
          />
        );
      } else {
        return null;
      }
    }).filter(Boolean);

    newCards.push(
      <HanabiCard
        key={this.cardCount}
        position={4}
        includeMulticolored={this.includeMulticolored}
        handleCardDelete={position => this.handleCardDelete(position)}
      />
    );

    this.cardCount++;
    this.setState({ cards: newCards });
  }

  render() {
    return (
      <div className="game">
        {this.state.cards}
      </div>
    );
  }
}

export default HanabiGame;
