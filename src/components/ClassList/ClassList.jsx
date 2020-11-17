import React from 'react';
import './ClassList.css';
import { db } from '../../services/firebase';
import { ClassItem, CreateClassModal } from '../../components';
import Button from 'react-bootstrap/Button';


let auth = 'tnakamura';

class ClassList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class_list: [],
            instructor: "",
        }
    }

    componentDidMount() {
        let users_ref = db.ref('/users/' + auth);

        users_ref.once('value')
        .then((data) => {
            data = data.val();
            this.setState({instructor: data.fname + " " + data.lname});
        })

        this.getClasses();

    }

    getClasses = ()  => {
        let classes_ref = db.ref('/classes');

        classes_ref.orderByChild('instructor').equalTo(auth).once('value')
        .then((data) => {
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


    createClass = (c_name, c_code, c_num) => {
        let classes_ref = db.ref('/classes');
        console.log(c_name + " " + c_code + " " + c_num);

        classes_ref.push({
            course_name: c_name,
            course_num: c_num,
            dept: c_code,
            instructor : auth,
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
                                instructor={this.state.instructor}
                                class_no={item.class_no}
                            />
                        )
                    })
                    : <div/> 
                }

                <CreateClassModal createClass={this.createClass}/>
                
            </div>
        )
        
    }
}

export default ClassList;
