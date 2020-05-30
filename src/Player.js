import React, {Component} from 'react';
import './Player.css';

class Player extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {player_card} = this.props;
        console.log("image: " + player_card.image_url);
        return (
            <div className="player" 
            style={{textAlign: "center"}}
            >
            <div style={{display:'flex'}}>
                <div>
                {/* {(player_card.name==='') &&
                    <div>
                        Who will win?
                    </div>
                } */}
                {(player_card.name!=='') && 
                    <div>
                        {player_card.name}<br/>
                        <img src={player_card.image_url} style={{ height: '30vh', width: '10vw' }}/>
                    </div>
                }
                </div>
                <div style={{marginLeft: '3vw', marginTop: 100}}>
                    You
                </div>
            </div>
            </div>
        );
    }
}

export default Player;