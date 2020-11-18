import React from 'react';
import './ClassRoom.css';
import Button from 'react-bootstrap/Button'
import Chat from "../../pages/Chat"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
                <Row>
                    <Col xs="8">
                        <h1>HI THERE THIS IS CLASS: {this.state.id}</h1>
                        <Button variant="success">Success</Button>
                    </Col>
                    <Col xs="4">
                        <Chat props={this.props}/>
                    </Col>
                </Row>
            </div>
        )
        
    }
}

export default ClassRoom;
