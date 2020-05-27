import React, {Component} from 'react';
import './DrawCard.css';
import './Score.js';
import { isEmpty } from "lodash";

class Score extends Component {
    render() {
        const {robot_score, player_score, round_winner, point_hold, deck} = this.props;
        console.log("round_winner: " + this.props.round_winner)
        return (
            <div className="score" style={{textAlign: "center"}}>
                {round_winner && !isEmpty(deck) &&
                    <div>
                        You have won the round!
                    </div>
                }
                {!round_winner && point_hold > 1 && !isEmpty(deck) &&
                    <div>
                        Tie! {point_hold} points will be give to the winner of the next round.
                    </div>
                }
                {!round_winner && point_hold === 1 && robot_score !== 0 && !isEmpty(deck) &&
                    <div>
                        Robot has won the round!
                    </div>
                }
                

                {isEmpty(deck) &&
                    <div>
                    {robot_score > player_score &&
                        <div>
                            You finished the game!<br/>
                            Robot won! Better luck next time!
                        </div>

                    }
                    {robot_score < player_score &&
                        <div>
                            You finished the game!<br/>
                            You won!
                        </div>
                    }
                    {robot_score === player_score &&
                        <div>
                            You finished the game!<br/>
                            Tie! You are neither a winner nor a loser!
                        </div>
                    }
                    </div>
                    
                }
                <br/>
                Score<br/>
                Robot: {robot_score}<br/>
                Player: {player_score}<br/>
            </div>
        );
    }
}

export default Score;