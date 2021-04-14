import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
const randomWords = require("random-words");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: randomWords().split(""),
      guessed: [],
      lives: 7,
    };
  }


  render() {
    const wordDisplay = (
      <div className="word-display">
        {this.state.word.map((char) => (
          <div className="word-display-unit">
            <div key={char} className="word-display-character">
              {this.state.guessed.includes(char)
                ? char
                : String.fromCharCode(160)}
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
              this.state.guessed.includes(letter) ? "" : this.setState({ guessed: [...this.state.guessed, letter] })
            }
          >
            {letter}
          </button>
        ))}
      </div>
    );

    return (
      <div className="word-display-container">
        {wordDisplay}
        {this.state.word.every((letter) =>
          this.state.guessed.includes(letter)
        ) ? (
          <div className="win-message">
            You won!
            <button
              onClick={() =>
                this.setState({ word: randomWords().split(""), guessed: [] })
              }
            >
              Play again
            </button>
          </div>
        ) : (
          <div className="controls">{keyboardDisplay}</div>
        )}
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
