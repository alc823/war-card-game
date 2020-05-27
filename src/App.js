import React, { Component } from 'react';
import './App.css';
import Robot from './Robot.js';
import Player from './Player.js';
import DrawCard from './DrawCard.js';
import Score from './Score.js';
import cards from './Cards.js';

class App extends Component {

  state = {

    // drawn card for robot
    robot_card: {
      name: '',
      value: -1,
      id: -1,
    },

    // drawn card for player
    player_card: {
      name: '',
      value: -2,
      id: -2
    },

    // scores of robot and player
    robot_score: 0,
    player_score: 0,

    // deck of cards
    deck: cards,

    // the number of points "saved up" via ties
    point_hold: 1, 

    // booleaan stating whether the player has won the round
    round_winner: false
  }

  handleDraw = () => {

    // setting variables to make code more readable/easier to adjust
    let robot_newnum = Math.floor(Math.random() * this.state.deck.length);
    let player_newnum = Math.floor(Math.random() * this.state.deck.length);

    while (robot_newnum == player_newnum) {
      player_newnum = Math.floor(Math.random() * this.state.deck.length);
    }

    let new_robot_card = this.state.deck[robot_newnum];
    let new_player_card = this.state.deck[player_newnum];


    // setting more variables
    let new_player_score = this.state.player_score;
    let new_robot_score = this.state.robot_score;
    let point_hold = this.state.point_hold;

    // create new deck that effectively removes the cards that were drawn
    const newDeck = this.state.deck.filter(card => card.id !== new_player_card.id && card.id !== new_robot_card.id);

    // updates state depending on whether a tie has occurred for that round or not:
    // if no tie has occurred
    if (new_robot_card.value !== new_player_card.value) {

      // if robot wins, add all points saved up to robot score
      if (new_robot_card.value > new_player_card.value) {
        this.setState({
          robot_card: new_robot_card,
          robot_score: new_robot_score + point_hold,
          player_card: new_player_card,
          point_hold: 1,
          deck: newDeck,
          round_winner: false,
        });
      } 
      // if player wins, add all points saved up to player score
      else if (new_robot_card.value < new_player_card.value) {
        this.setState({
          robot_card: new_robot_card,
          player_card: new_player_card,
          player_score: new_player_score + point_hold,
          point_hold: 1,
          deck: newDeck,
          round_winner: true,
        });
      }
    } 
    // if tie has occurred
    else {
      let add_point_hold = point_hold + 1;
      this.setState({
        robot_card: new_robot_card,
        player_card: new_player_card,
        point_hold: add_point_hold,
        deck: newDeck,
        round_winner: false
      })
    }
  }

  render() {
    for (let i = 0; i < 52; i++) {
      console.log(cards[i]);
    }
    return (
      <div>
        <h2 className="header" style={{display:"flex", justifyContent:"center"}}>War Card Game</h2>
        <Robot
          robot_card={this.state.robot_card}
        />
        <Player 
          player_card={this.state.player_card}
        />
        <br/>
        <DrawCard 
          taken_out={this.state.taken_out}
          deck={this.state.deck}
          handleDraw={this.handleDraw}
        />
        <br/>
        <Score
          deck={this.state.deck}
          point_hold={this.state.point_hold}
          round_winner={this.state.round_winner}
          robot_score={this.state.robot_score}
          player_score={this.state.player_score}
        />
      </div>
    );
  }
}

export default App;
