import React, {Component} from 'react';
import { isEmpty } from "lodash";
import './RoundStatus.css';

class RoundStatus extends Component {
    render() {
        const {robot_score, player_score, round_winner, point_hold, deck} = this.props;
        let remaining_rounds = (this.props.deck.length / 2);
        return(
            <div style={{textAlign: "center"}} className="status">
                {round_winner && !isEmpty(deck) &&
                    <div>
                        You have won the round! {remaining_rounds} rounds left!
                    </div>
                }
                {!round_winner && point_hold > 1 && !isEmpty(deck) &&
                    <div>
                        Tie! {point_hold} points will be give to the winner of the next round.<br/>
                        {remaining_rounds} rounds left!
                    </div>
                }
                {!round_winner && point_hold === 1 && robot_score !== 0 && !isEmpty(deck) &&
                    <div>
                        Robot has won the round! {remaining_rounds} rounds left!
                    </div>
                }
                { robot_score === 0 && player_score === 0 &&
                <div>
                    Press the button below to get the game started!
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
                            You won! gg wp
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
            </div>
        );
    }
}

export default RoundStatus;