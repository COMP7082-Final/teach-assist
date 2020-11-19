import React from 'react';
import './ClassMember.css';
import Card from 'react-bootstrap/Card'


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
                <Card>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + "/PersonPlaceholder.png"} />
                    <Card.Body>
                        <Card.Title>{this.props.fname}</Card.Title>
                        <Card.Title>{this.props.lname}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        )
        
    }
}

export default ClassMember;
