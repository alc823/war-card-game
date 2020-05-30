import React, {Component} from 'react';
import './Robot.css';

class Robot extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {robot_card} = this.props;
        console.log('image url: ' + robot_card.image_url);
        return (
            <div className="robot" 
            // style={{display: "flex", justifyContent: "center"}}
            style={{textAlign: "center"}}
            >
            <div style={{display:'flex'}}>
                <div style={{marginRight: '3vw', marginTop: 100}}>
                    Robot
                </div>
                <div>
                    {/* {(robot_card.name==='') &&
                        <div>
                            Who will win?
                        </div>
                    } */}
                    {(robot_card.name!=='') && 
                        <div>
                            {robot_card.name}<br/>
                            <img src={robot_card.image_url} style={{ height: '30vh', width: '10vw' }}/>
                        </div>
                    }
                 </div>
                </div>
                
            </div>
        );
    }
}

export default Robot