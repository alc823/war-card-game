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
                        Tie! {point_hold} points will be give to the winner of the next round. {remaining_rounds} rounds left!
                    </div>
                }
                {!round_winner && point_hold === 1 && robot_score !== 0 && !isEmpty(deck) &&
                    <div>
                        Robot has won the round! {remaining_rounds} rounds left!
                    </div>
                }
                { robot_score === 0 && player_score === 0 && point_hold === 1 &&
                <div>
                    Press the button below to draw the first card!
                </div>
                }
                

                {isEmpty(deck) &&
                    <div>
                    {robot_score > player_score &&
                        <div>
                            You finished the game! Robot won! Better luck next time!
                        </div>

                    }
                    {robot_score < player_score &&
                        <div>
                            You finished the game! You won! gg wp
                        </div>
                    }
                    {robot_score === player_score &&
                        <div>
                            You finished the game! Tie! You neither won nor loss!
                        </div>
                    }
                    </div>
                    
                }
            </div>
        );
    }
}

export default RoundStatus;