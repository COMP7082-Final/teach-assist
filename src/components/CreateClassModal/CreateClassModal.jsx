import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import './CreateClassModal.css';


class CreateClassModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false,
            c_name: null,
            c_code: null,
            c_num: null,
        }
    }

    setModalShow = (bool) => { this.setState({is_visible : bool});}

    handleInputChange = (event) => {
        //if text
        const value = event.target.value;
        const name = event.target.name;

        console.log("Setting " + name + " : " + value);

        this.setState({ [name] : value});
    }

    submitClass = (c_name, c_code, c_num) => {
        console.log(c_name + " " + c_code + " " + c_num);
        if (c_name && c_code && c_num)
        {
            this.props.createClass(c_name, c_code, c_num);
            this.setModalShow(false);
        }
        else 
        {
            console.log("Somethign is null");
        }

    }
    

    render() {

        return (

        <div>
            <Button block variant="outline-dark" onClick={() => this.setModalShow(true)}>
                Create Class
            </Button>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.state.is_visible}
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Create Class Session
                    </Modal.Title>
                </Modal.Header>

                
                <Modal.Body>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control name="c_name" type="text" placeholder="Eg. Intro to Datacomm"  onChange={this.handleInputChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control name="c_code" type="text" placeholder="Eg: COMP" onChange={this.handleInputChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Course Number</Form.Label>
                        <Form.Control name="c_num" type="text" placeholder="Eg: 3760" onChange={this.handleInputChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Instructor</Form.Label>
                        <Form.Control type="text" value="test" readonly required/>
                    </Form.Group>

                </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.submitClass(this.state.c_name, this.state.c_code, this.state.c_num)}>Submit</Button>
                    <Button variant="danger" onClick={() => this.setModalShow(false)}>Close</Button>
                </Modal.Footer>
        
            </Modal>
        </div>
        )
        
    }
}

export default CreateClassModal;
