import React from 'react';
import './ClassRoom.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ClassMember } from '../../components';
import { db } from '../../services/firebase';

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

        // if (this.state.members)
        // {
        //     let test = [];

        //     for (let i = 0; i < Math.ceil(this.state.members.length / 4); i++)
        //     {
        //         let row = [];
        //         for (let j = 0; j < 4 && i * j < ; j++)
        //         {
        //             row[j].push(this.state.members[i +j])
        //         }
        //         test[i].push[row];
        //     }
        //     console.log(test);
        // }

        return (
            <div>
            <h1>HI THERE THIS IS CLASS: {this.state.id}</h1>
            <Container>
            {this.state.members ?
                    this.state.members.map((item, index) => {
                        return ( 
                            <Row>
                                <Col>
                                    <ClassMember 
                                        key={index}
                                        fname={item.fname}
                                        lname={item.lname}
                                    />
                                </Col>
                            </Row>
                        )
                    })
                    : <div/> 
                }
            </Container>
            <Button onClick={() => this.addData()} variant="success">Success</Button>{' '}
            </div>
        )
        
    }
}

export default ClassRoom;
