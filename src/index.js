import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Gallows from "./Gallows";
const randomWords = require("random-words");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: randomWords().split(""),
      guessed: [],
      lives: 6,
    };
  }

  render() {
    const mistakes = this.state.guessed.filter(
      (letter) => !this.state.word.includes(letter)
    ).length;
    const won = this.state.word.every((letter) =>
      this.state.guessed.includes(letter)
    );

    const wordDisplay = (
      <div className="word-display">
        {this.state.word.map((char) => (
          <div className="word-display-unit">
            <div key={char} className="word-display-character">
              {this.state.guessed.includes(char)
                ? char
                : (mistakes >= this.state.lives ? char : String.fromCharCode(160))}
            </div>
            <div className="word-display-character-underline"></div>
          </div>
        ))}
      </div>
    );
    const keyboardDisplay = (
      <div className="keyboard">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            className={
              !this.state.guessed.includes(letter)
                ? "keyboard-button-enabled"
                : this.state.word.includes(letter)
                ? "keyboard-button-correct"
                : "keyboard-button-incorrect"
            }
            key={letter}
            onClick={() =>
              this.state.guessed.includes(letter)
                ? ""
                : this.setState({ guessed: [...this.state.guessed, letter] })
            }
          >
            {letter}
          </button>
        ))}
      </div>
    );

    if (won) {
      return (
        <div className="word-display-container">
          {wordDisplay}
          <div className="msg-container win-message">
            You won!
            <button
              onClick={() =>
                this.setState({ word: randomWords().split(""), guessed: [] })
              }
            >
              Play again
            </button>
          </div>
        </div>
      );
    }

    const gallows = <Gallows lives={this.state.lives} progress={mistakes} />;
    if (mistakes >= this.state.lives) {
      return (
        <div className="word-display-container">
          {gallows}
          {wordDisplay}
          <div className="msg-container lose-message">
            Oops, you lost!
            <button
              onClick={() =>
                this.setState({ word: randomWords().split(""), guessed: [] })
              }
            >
              Play again
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="word-display-container">
        {gallows}
        {wordDisplay}
        {keyboardDisplay}
      </div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
    };
  }

  render() {
    if (this.state.gameStarted) return <Game />;
    return (
      <div>
        hangman
        <button onClick={() => this.setState({ gameStarted: true })}>
          Start
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
