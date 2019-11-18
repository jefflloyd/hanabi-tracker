import React, { Component } from 'react';
import './HanabiCard.css';

const RANKS = ['1', '2', '3', '4', '5'];
const COLORS = ['R', 'Y', 'G', 'B', 'W'];

class HanabiCard extends Component {
  constructor(props) {
    super(props);

    if (!this.props.includeMulticolored) {
      this.colors = COLORS;
    } else {
      this.colors = [...COLORS, 'M'];
    }

    this.state = {
      selectedRanks: [...RANKS],
      selectedColors: [...this.colors]
    }
  }

  toggleRank(e) {
    const newSelectedRanks = [...this.state.selectedRanks];
    const rank = e.target.textContent;
    const indexOfSelectedRank = this.state.selectedRanks.indexOf(rank);

    if (indexOfSelectedRank < 0) {
      newSelectedRanks.push(rank);
    } else {
      newSelectedRanks.splice(indexOfSelectedRank, 1);
    }

    this.setState({ selectedRanks: newSelectedRanks });
  }

  toggleColor(e) {
    const newSelectedColors = [...this.state.selectedColors];
    const color = e.target.textContent;
    const indexOfSelectedColor = this.state.selectedColors.indexOf(color);

    if (indexOfSelectedColor < 0) {
      newSelectedColors.push(color);
    } else {
      newSelectedColors.splice(indexOfSelectedColor, 1);
    }

    this.setState({ selectedColors: newSelectedColors });
  }

  removeCard(e) {
    const answer = window.confirm(`Really remove card at position ${this.props.position + 1}?`);

    if (answer) {
      this.props.handleCardDelete(this.props.position);
    }
  }

  render() {
    return (
      <div className="hanabi-card">
        <div className="rank-and-color-container">
          <div className="rank-container">
            {RANKS.map(rank =>
              <div
                key={rank}
                className={"rank-item " + (this.state.selectedRanks.includes(rank) ? "rank-item--selected" : "")}
                onClick={e => this.toggleRank(e)}>
                {rank}
              </div>
            )}
          </div>
          <div className="color-container">
            {this.colors.map(color =>
              <div
                key={color}
                data-color={color}
                className={"color-item " + (this.state.selectedColors.includes(color) ? "color-item--selected" : "")}
                onClick={e => this.toggleColor(e)}>
                {color}
              </div>
            )}
          </div>
        </div>
        <div className="other-container">
          <div className="card-number">Card #{this.props.position + 1}</div>
          <div
            className="remove-card"
            onClick={e => this.removeCard()}>
            Remove
          </div>
        </div>
      </div>
    );
  }
}

export default HanabiCard;