import React from 'react';
import './ClassItem.css';
import {
    Link,
} from "react-router-dom";
import PropTypes from 'prop-types';

class ClassItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props, "PROP HERE")
    }

    render() {

        return (
            <Link to={`/classroom/${this.props.class_id}`} >
                <div id={this.props.dept + this.props.course_num} className="listitem">
                    <h1>{this.props.dept} {this.props.course_num}</h1>
                    <h2>{this.props.instructor}</h2>
                    <h3>{this.props.class_no}</h3>
                </div>
            </Link>
        )
        
    }
}

ClassItem.propTypes = {
    dept: PropTypes.string,
    course_num: PropTypes.string,
    instructor: PropTypes.string,
    class_no: PropTypes.string,
    class_id: PropTypes.string
  };

export default ClassItem;
