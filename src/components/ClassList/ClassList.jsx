import React from 'react';
import './ClassList.css';
import { db } from '../../services/firebase';
import { ClassItem } from '../../components';

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

            data.forEach((child) => {
                class_list.push(child.val());
            })
            this.setState({class_list: class_list})
        })
    }


    createClass = () => {
        const input = {
            course_num: 1003,
            dept: "MATH",
            instructor: auth,
        }
        let classes_ref = db.ref('/classes/' + input.dept + input.course_num);

        classes_ref.set({
            course_num: input.course_num,
            dept: input.dept,
            instructor: auth,
        });

        this.getClasses();
    }

    render() {
        // let list = [
        //     {id: 1, classname: "COMP 2000", instructor: "Sam Tadey", class_no: 25}, 
        //     {id: 2, classname: "COMP 3000", instructor: "Jason", class_no: 23}, 
        //     {id: 3, classname: "COMP 4000", instructor: "Lydia", class_no: 23}, 
        //     {id: 4, classname: "COMP 4400", instructor: "Lydia", class_no: 23},
        //     {id: 5, classname: "COMP 4600", instructor: "Lydia", class_no: 22}
        // ];

        return (
            <div className="classlist_container">
                {this.state.class_list ? 
                    this.state.class_list.map((item, index) => {
                        return ( 
                            <ClassItem 
                                key={index}
                                course_num={item.course_num}
                                dept={item.dept}
                                instructor={this.state.instructor}
                                class_no={item.class_no}
                            />
                        )
                    })
                    : <div/> 
                }

                {/* {this.state.class_list.map((item, index) => {
                    return ( 
                        <ClassItem 
                            name={item.classname}
                            dept={item.dept}
                            instructor={item.instructor}
                            class_no={item.class_no}
                        />
                    )
                })} */}

                <button onClick={this.createClass}>Create Class</button>
                
            </div>
        )
        
    }
}

export default ClassList;
