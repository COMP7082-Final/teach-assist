import React from 'react';
import './ClassRoom.css';
import { db } from '../../services/firebase';
import { ClassItem } from '../../components';

let auth = 'tnakamura';

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
            <h1>HI THERE THIS IS CLASS: {this.state.id}</h1>
        )
        
    }
}

export default ClassRoom;
