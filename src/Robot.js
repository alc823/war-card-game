import React, {Component} from 'react';
import './Robot.css';

class Robot extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {robot_card} = this.props
        return (
            <div className="robot" 
            // style={{display: "flex", justifyContent: "center"}}
            style={{textAlign: "center"}}
            >
                Robot<br/>
                <div>
                    {(robot_card.name==='') &&
                        <div>
                            Press 'Draw Card!' button to start game.
                        </div>
                    }
                    {(robot_card.name!=='') && 
                        <div>
                            New Card: {robot_card.name}
                        </div>
                    }
                </div>
                
            </div>
        );
    }
}

export default Robot