import React, {useContext} from 'react';
import './Auth.css';
import { auth, db } from '../../services/firebase';
import { ClassItem, CreateClassModal } from '../../components';
import Logout from '../Auth/Logout';
import { BrowserRouter as Router } from "react-router-dom";
import { Link, withRouter} from 'react-router-dom';

//let key = "";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            role: "",
        }
    }

    componentDidMount = () => {
        console.log(auth.currentUser.uid);
        var ref = db.ref("users");
        var query = ref.orderByChild("uid").equalTo(auth.currentUser.uid);
        query.once("value")
        .then((snapshot) => {
            console.log(Object.keys(snapshot.val()))
            var key = Object.keys(snapshot.val());

        var users_ref = db.ref('/users/' + key);
        var userRole = "";
        users_ref.once('value')
        .then((data) => {
            data = data.val();
            console.log(data);
            if (data.role == "1") {
                userRole = "Instructor";
            } else {
                userRole = "Student";
            }
            this.setState({fname: data.fname, lname: data.lname, email: data.email, role: userRole});
            console.log(this.state);
        })
})
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid py-5">
                <div className="container col-7 py-5">
                    <form>
                        <h1 className="display-4">Profile</h1>
                        <div className="form-group margin">
                            <label htmlFor="FirstName">First Name</label>
                            <input
                                className="form-control"
                                name="fname"
                                type="text"
                                value={this.state.fname}
                            />
                        </div>
                        <div className="form-group margin">
                            <label htmlFor="LastName">Last Name</label>
                            <input
                                className="form-control"
                                name="lname"
                                type="text"
                                value={this.state.lname}
                            />
                        </div>
                        <div className="form-group margin">
                            <label htmlFor="LastName">Email Address</label>
                            <input
                                className="form-control"
                                name="email"
                                type="text"
                                value={this.state.email}
                                readonly
                            />
                        </div>
                        <div className="form-group margin">
                            <label htmlFor="Role">Role</label>
                            <input
                                className="form-control"
                                name="role"
                                type="text"
                                value={this.state.role}
                                readonly
                            />
                        </div>  
                        <div className="form-group margin"> 
                            <Router><Logout /></Router>
                            <Link className="btn btn-primary px-5 mr-3" to="/">Back To Home Page</Link>     
                        </div>
                    </form>
                </div> 
            </div>
        )
        
    }
}
 
export default Profile;
