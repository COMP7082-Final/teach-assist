import React, {useContext} from 'react';
import './ClassList.css';
import { auth, db } from '../../services/firebase';
import { ClassItem, CreateClassModal } from '../../components';
import Logout from '../Auth/Logout';
import { BrowserRouter as Router } from "react-router-dom";

class ClassList extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props, "PROP HERE")
        this.state = {
            class_list: [],
            instructor: "",
        }
    }

    componentDidMount = () => {
        console.log(auth.currentUser.uid);
        var ref = db.ref("users");
        //var query = ref.orderByChild("uid").equalTo(auth.currentUser.uid);
        var query = ref.orderByChild("uid").equalTo(auth.currentUser.uid);
        query.once("value")
        .then((snapshot) => {
            //var key = Object.keys(snapshot.val()); 
            console.log(Object.keys(snapshot.val()))
            //this.setState({instructor:snapshot.child("fname").key + " " + snapshot.child("lname").key});
            var users_ref = db.ref('/users/' + Object.keys(snapshot.val()));
            users_ref.once('value')
            .then((data) => {
                data = data.val();
                console.log(data);
                console.log(data.fname + " " + data.lname);
                this.setState({instructor: data.fname + " " + data.lname});
                console.log(this.state.instructor);
            })
        })
        this.getClasses();
    }

    getClasses = ()  => {
        let classes_ref = db.ref('/classes');
        console.log(this.state.instructor);
        classes_ref.orderByChild('instructor').equalTo("Qog0VVN3f2QlTyzl6SESDZjJfj92").once('value')
        .then((data) => {
            console.log(data);
            let class_list = [];
            let i = 0;

            data.forEach((child) => {
                class_list.push(child.val());
            })

            //extract class id's
            Object.keys(data.val()).forEach(key => {
                console.log(key);
                class_list[i++]['class_id'] = key;
            })
            console.log(class_list);

            this.setState({class_list: class_list})
        })
    }


    //this function has to create classroom with the corresponding id as well
    createClass = (c_name, c_code, c_num) => {
        let classes_ref = db.ref('/classes');
        console.log(c_name + " " + c_code + " " + c_num);
        console.log(this.state.instructor);
        classes_ref.push({
            course_name: c_name,
            course_num: c_num,
            dept: c_code,
            instructor : auth.currentUser.uid,
        });

        this.getClasses();
    }

    render() {

        return (
            <div className="classlist_container">
                {this.state.class_list ? 
                    this.state.class_list.map((item, index) => {
                        return ( 
                            <ClassItem 
                                key={index}
                                class_id={item.class_id}
                                course_num={item.course_num}
                                dept={item.dept}
                                instructor={"Qog0VVN3f2QlTyzl6SESDZjJfj92"}
                                class_no={item.class_no}
                            />
                        )
                    })
                    : <div/> 
                }

                <CreateClassModal createClass={this.createClass}/>
                <div className="margin-top"><Router><Logout /></Router></div>
            </div>
        )
        
    }
}

export default ClassList;
