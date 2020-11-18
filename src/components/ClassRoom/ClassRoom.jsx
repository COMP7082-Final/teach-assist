import React from 'react';
import './ClassRoom.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ClassMember } from '../../components';
import { db } from '../../services/firebase';


let auth = "stadey";

class ClassRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
    }

    addData = () => {
        //let classes_ref = db.ref('/classrooms');

        // classes_ref.set({
        //     chat_log: {},
        //     members: {
        //         tnakamura: true,
        //         stadey: true,
        //         test1: true,
        //         test3: true,
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
        console.log(classroom);

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
                            console.log(members);
                            this.setState({members: members});
                            console.log(this.state.members);
                        }
                        
                    })
                })
            })
            
        })
    }

    componentDidMount() {
        if (this.props.match.params)
        {
            this.setState({id: this.props.match.params.class_id});
            this.getMembers(this.props.match.params.class_id);
            console.log("TEST");
        }
        else 
        {
            alert("SOMETHING BROKE!");
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

        //let members2d = [[1,2,3,4], [5,6,7,8], [9, 10]];

        return (
            <div>
            <h1>HI THERE THIS IS CLASS: {this.state.id}, USER: {auth}</h1>
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
                {/* {this.state.members ?
                    this.state.members.map((item, index) => {
                        return ( 
                            index % 4 == 0 ? <Row> : <div/>
                                <Col>
                                    <ClassMember 
                                        key={index}
                                        fname={item.fname}
                                        lname={item.lname}
                                    />
                                </Col>
                            index % 4 == 1 ? </Row> : <div/>
                        )
                    })
                    : <div/> 
                } */}
            </Container>
            <Button onClick={() => this.addData()} variant="success">Success</Button>{' '}
            </div>
        )
        
    }
}

export default ClassRoom;
