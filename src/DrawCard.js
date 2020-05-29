import React, {Component} from 'react';
import './DrawCard.css';
import { isEmpty } from "lodash";

class DrawCard extends Component {
    render() {
        const {handleDraw, deck, startOver, robot_score, player_score} = this.props;
        return (
            <div style={{display:"flex", justifyContent:"center"}}>
                <div>
                    {!isEmpty(deck) &&
                        <div>
                            {!(robot_score === 0 && player_score === 0) &&
                            <button className="button" type="button" onClick={() => handleDraw()}>Draw Card!</button>
                            }
                            {robot_score === 0 && player_score === 0 &&
                            <button className="button" type="button" onClick={() => handleDraw()}>Start game!</button>
                            }
                        </div>
                    }
                    {isEmpty(deck) &&
                        <div>
                            <button className="button" type="button" onClick={() => startOver()}>Play Again!</button>
                        </div>
                    }
                </div>
                
            </div> 
        );
    }
}

export default DrawCard