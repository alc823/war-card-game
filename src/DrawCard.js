import React, {Component} from 'react';
import './DrawCard.css';
import { isEmpty } from "lodash";

class DrawCard extends Component {
    render() {
        const {handleDraw, deck, taken_out} = this.props;
        return (
            <div style={{display:"flex", justifyContent:"center"}}>
                <div>
                    {!isEmpty(deck) &&
                        <div>
                            <button className="button" type="button" onClick={() => handleDraw()}>Draw Card!</button>
                        </div>
                    }
                </div>
                
            </div> 
        );
    }
}

export default DrawCard