import React from 'react';
import './ClassMember.css';
import Button from 'react-bootstrap/Button'

class ClassMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        // if (this.props.match.params)
        // {
        //     this.setState({id: this.props.match.params.class_id});
        // }
    }



    render() {

        return (
            <div className="member_container">
                <h2>{this.props.fname} {this.props.lname}</h2>
                <h2>NAME HERE</h2>
            </div>
        )
        
    }
}

export default ClassMember;
