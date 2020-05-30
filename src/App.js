import React, { Component } from 'react';
import './App.css';
import Robot from './Robot.js';
import Player from './Player.js';
import DrawCard from './DrawCard.js';
import RoundStatus from './RoundStatus.js';
import Score from './Score.js';
import cards from './Cards.js';
import Login from './Login.js';
import { app, base } from './base.js';
import { Spinner } from '@blueprintjs/core';
import { isEmpty } from "lodash";

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

    robot_overall_score: 0,
    player_overall_score: 0,

    // deck of cards
    deck: cards,

    // the number of points "saved up" via ties
    point_hold: 1, 

    // booleaan stating whether the player has won the round
    round_winner: false,

    authenticated: false,
    loading: true
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })

    // this.robotCardRef = base.syncState('robot_card', {
    //   context: this,
    //   state: 'robot_card'
    // });
    // this.playerCardRef = base.syncState('player_card', {
    //   context: this,
    //   state: 'player_card'
    // })

    // this.robotScoreRef = base.syncState('robot_score', {
    //   context: this,
    //   state: 'robot_score'
    // })
    // this.playerScoreRef = base.syncState('player_score', {
    //   context: this,
    //   state: 'player_score'
    // })
    this.robotOverallScoreRef = base.syncState('robot_overall_score', {
      context: this,
      state: 'robot_overall_score'
    })
    this.playerOverallScoreRef = base.syncState('player_overall_score', {
      context: this,
      state: 'player_overall_score'
    })

    // this.cardsRef = base.syncState('deck', {
    //   context: this,
    //   state: 'deck'
    // })
    // this.pointHoldRef = base.syncState('point_hold', {
    //   context: this,
    //   state: 'point_hold'
    // })
    // this.roundWinnerRef = base.syncState('round_winner', {
    //   context: this,
    //   state: 'round_winner'
    // })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    // base.removeBinding(this.robotCardRef);
    // base.removeBinding(this.playerCardRef);
    
    // base.removeBinding(this.robotScoreRef);
    // base.removeBinding(this.playerScoreRef);
    base.removeBinding(this.robotOverallScoreRef);
    base.removeBinding(this.playerOverallScoreRef);

    // base.removeBinding(this.cardsRef);
    // base.removeBinding(this.pointHoldRef);
    // base.removeBinding(this.roundWinnerRef);
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
        new_robot_score += point_hold;
        this.setState({
          robot_card: new_robot_card,
          robot_score: new_robot_score,
          player_card: new_player_card,
          point_hold: 1,
          deck: newDeck,
          round_winner: false,
        });
        
      } 
      // if player wins, add all points saved up to player score
      else if (new_robot_card.value < new_player_card.value) {
        new_player_score += point_hold;
        this.setState({
          robot_card: new_robot_card,
          player_card: new_player_card,
          player_score: new_player_score,
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

    if (newDeck.length === 0) {
      if (new_player_score > new_robot_score) {
        this.setState(prevState => {
          return {
            player_overall_score: prevState.player_overall_score + 1
          }
        })
      } else if (new_player_score < new_robot_score) {
        this.setState(prevState => {
          return {
            robot_overall_score: prevState.robot_overall_score + 1
          }
        })
      }
     
    }
  }

  startOver = () => {
    this.setState({
      deck: cards,
      robot_card: {
        name: '',
        value: -1,
        id: -1,
      },
      player_card: {
        name: '',
        value: -2,
        id: -2
      },
      robot_score: 0,
      player_score: 0,
      deck: cards,
      point_hold: 1, 
      round_winner: false,
    })
  }

  resetUniverse = () => {
    this.setState({
      deck: cards,
      robot_card: {
        name: '',
        value: -1,
        id: -1,
      },
      player_card: {
        name: '',
        value: -2,
        id: -2
      },
      robot_score: 0,
      player_score: 0,
      robot_overall_score: 0,
      player_overall_score: 0,
      deck: cards,
      point_hold: 1, 
      round_winner: false,
    })
  }

  handleLogout = () => {
    app.auth().signOut().then((user) => {
        this.setState({
          authenticated: false
        })
    })
  }

  render() {
    return (
      <div className='page'>

        <div style={{justifyContent:"center", marginLeft: '42vw'}}>
          <h2 className="header" style={{display:"inline", justifyContent:"center"}}>War Card Game</h2>
          {this.state.authenticated &&
            <button className="button" type="button" onClick={() => this.handleLogout()} style={{marginLeft: '50vw', marginTop:'0vh'}}>Logout</button>
          }
          
        </div>

        {!this.state.authenticated &&
          <div>
            <Login />
          </div>
        }

        {this.state.authenticated &&
        <div>
          <Score
            deck={this.state.deck}
            point_hold={this.state.point_hold}
            round_winner={this.state.round_winner}
            robot_score={this.state.robot_score}
            player_score={this.state.player_score}
            robot_overall_score={this.state.robot_overall_score}
            player_overall_score={this.state.player_overall_score}
          />
          <div style={{display:"flex", justifyContent: "center", }} className='battlefield'>
            <Robot
              robot_card={this.state.robot_card}
            />
            {!isEmpty(this.state.deck) && this.state.player_score === 0 && this.state.robot_score === 0 && 
              <div style={{marginTop: 120}}>
                vs.
              </div>
            }
            <Player 
              player_card={this.state.player_card}
            />
          </div>
          <br/>
          <RoundStatus
              deck={this.state.deck}
              point_hold={this.state.point_hold}
              round_winner={this.state.round_winner}
              robot_score={this.state.robot_score}
              player_score={this.state.player_score}
            />
          <DrawCard
            deck={this.state.deck}
            handleDraw={this.handleDraw}
            startOver={this.startOver}
            robot_score={this.state.robot_score}
            player_score={this.state.player_score}
            resetUniverse={this.resetUniverse}
          />
        </div>
        }
      </div>
    );
  }
}

export default App;
