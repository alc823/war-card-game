import React, {Component} from 'react';
import './Player.css';

class Player extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {player_card} = this.props;
        return (
            <div className="player" 
            // style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}
            style={{textAlign: "center"}}
            >
                You<br/>
                <div>
                {(player_card.name==='') &&
                    <div>
                        Press 'Draw Card!' button to start game.
                    </div>
                }
                {(player_card.name!=='') && 
                    <div>
                        New Card: {player_card.name}
                    </div>
                }
                </div>
                
            </div>
        );
    }
}

export default Player;