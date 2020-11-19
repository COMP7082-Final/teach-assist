import React from 'react';
import './ClassRoom.css';
import Button from 'react-bootstrap/Button'
import Chat from "../../pages/Chat"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ClassMember } from '../../components';
import { db } from '../../services/firebase';



let auth = "stadey";

class ClassRoom extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            members: []
        }
    }

    addData = () => {
        // let classes_ref = db.ref('/classrooms/MATH8056');

        // classes_ref.set({
        //     chat_log: {},
        //     members: {
        //         tnakamura: true,
        //         stadey: true,
        //         test1: true,
        //         test2: true,
        //         MMOVNpo7siOq0iTv2re: true,
        //     }                
        // });
    }

    //i dont' like this
    //very messy
    //most definitely doesn't scale well
    getMembers = (class_id) => {
        let classroom = db.ref('/classrooms/' + class_id);
        let users = db.ref('/users');
        console.log(class_id);
        //console.log(classroom);

        classroom.orderByChild("members").once('value')
        .then((data) => {
            let members = [];
            //have all members of class
            data.forEach((child) => {
 
                console.log(child.val());

                Object.keys(child.val()).forEach(key => {
                    console.log(key);

                    users = db.ref('/users/' + key);
                    users.once('value')
                    .then((data) => {
                        if (data.val())
                        {
                            members.push(data.val());
                            //console.log(members);
                            this.setState({members: members});
                            //console.log(this.state.members);
                        }
                        
                    })
                })
            })
            
        })
    }

    componentDidMount() {
        try {
            if (this.props.match.params) {
                this.setState({id: this.props.match.params.class_id});
                this.getMembers(this.props.match.params.class_id);
                console.log("TEST");
            }
        }
        catch(e) {
            alert("SOMETHING BROKE!");
            console.log(e);
            console.log(this.props, "This prop")
        }
    }



    render() {

        const members2d = [];
        if (this.state.members)
        {
            //gotta copy array
            let members1d = this.state.members.slice();
            while(members1d.length)
            {
                if (members1d.length < 4)
                    members2d.push(members1d.splice(0, members1d.length));
                else
                    members2d.push(members1d.splice(0,4));
                
                console.log(members2d);
            }
        }
        console.log(members2d);


        return (
            <div>
                <Row>
                    <Col xs="8">
                        <h1>THIS IS CLASS: {this.state.id}, USER: {auth}</h1>
                        <Container>
                            {members2d ? 
                                members2d.map((row) => {
                                        return (
                                            <Row>
                                            {row.map((item, index) => {
                                                return (
                                                <Col>
                                                    <ClassMember 
                                                        key={index}
                                                        fname={item.fname}
                                                        lname={item.lname}
                                                    />
                                                </Col>
                                                )
                                            })}
                                            </Row>
                                        )
                                })
                            : <div/>}
                        </Container>
                        <Button onClick={() => this.addData()} variant="success">Success</Button>{' '}
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
