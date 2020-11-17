import React from 'react';
import './ClassRoom.css';
import Button from 'react-bootstrap/Button'

//let auth = 'tnakamura';

class ClassRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        if (this.props.match.params)
        {
            //console.log(this.props);
            this.setState({id: this.props.match.params.class_id});
        }
    }



    render() {

        return (
            <div>
            <h1>HI THERE THIS IS CLASS: {this.state.id}</h1>
            <Button variant="success">Success</Button>{' '}
            </div>
        )
        
    }
}

export default ClassRoom;
