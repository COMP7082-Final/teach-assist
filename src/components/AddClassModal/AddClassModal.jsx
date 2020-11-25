import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import './AddClassModal.css';
import { auth, db } from '../../services/firebase';


class AddClassModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false,
            course_code: 0,
        }
    }

    componentDidMount = () => {
        console.log(auth.currentUser.uid);
        var ref = db.ref("users");
        var query = ref.orderByChild("uid").equalTo(auth.currentUser.uid);
        query.once("value")
        .then((snapshot) => {
            console.log(Object.keys(snapshot.val()))
            var users_ref = db.ref('/users/' + Object.keys(snapshot.val()));
            users_ref.once('value')
            .then((data) => {
                data = data.val();
                console.log(data.fname + " " + data.lname);
                this.setState({user_name: data.fname + " " + data.lname});
                //console.log(this.state.instructor);
                console.log(this.state.user_name);
            })
        })
    }

    setModalShow = (bool) => { this.setState({is_visible : bool});}

    handleInputChange = (event) => {
        //if text
        const value = event.target.value;
        const name = event.target.name;

        console.log("Setting " + name + " : " + value);

        this.setState({ [name] : value});
    }

    addClass = (code) => {
        console.log(code);
        if (code)
        {
            this.props.addClass(code);
            //gotta check if code is correct
            this.setModalShow(false);
        }
        else 
        {
            console.log("Something is null");
        }

    }
    

    render() {

        return (

        <div>
            <Button block variant="outline-dark" onClick={() => this.setModalShow(true)}>
                Add Class
            </Button>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.state.is_visible}
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Class Session
                    </Modal.Title>
                </Modal.Header>

                
                <Modal.Body>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control name="course_code" type="text" placeholder="Xi78yu%6"  onChange={this.handleInputChange} required/>
                    </Form.Group>

                </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.addClass(this.state.course_code)}>Submit</Button>
                    <Button variant="danger" onClick={() => this.setModalShow(false)}>Close</Button>
                </Modal.Footer>
        
            </Modal>
        </div>
        )
        
    }
}

export default AddClassModal;
