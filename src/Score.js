import React, {Component} from 'react';
// import './DrawCard.css';
import './Score.css';
import { isEmpty } from "lodash";

class Score extends Component {
    render() {
        const {robot_score, player_score, robot_overall_score, player_overall_score} = this.props;
        // console.log("round_winner: " + this.props.round_winner)
        return (
            <div className="score" style={{textAlign: "center"}}>
                { !(robot_score === 0 && player_score === 0) &&
                    <div className="score_info">
                        Score<br/>
                        Robot: {robot_score}<br/>
                        Player: {player_score}<br/>
                    </div>
                }
                {robot_score === 0 && player_score === 0 &&
                    <div>
                        {robot_overall_score === 0 && player_overall_score === 0 &&
                            <div className="info">
                            What is war?<br/>
                            In this case, war is a card game where each player draws a card at random from a deck, and the card with the highest rank wins.
                            Ready to get started? Then press 'Start game!' to draw the first card!
                            </div>
                        }
                        {!(robot_overall_score === 0 && player_overall_score === 0) &&
                            <div className="score_info">
                            Overall Score<br/>
                            Robot: {robot_overall_score}<br/>
                            Player: {player_overall_score}<br/>
                            </div>
                        }
                    </div>
                    
                }
                
            </div>
        );
    }
}

export default Score;