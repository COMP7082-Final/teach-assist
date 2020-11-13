import React from 'react';
import './ClassItem.css';


class ClassItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="listitem">
                <h1>{this.props.dept} {this.props.course_num}</h1>
                <h2>{this.props.instructor}</h2>
                <h3>{this.props.class_no}</h3>
            </div>

        )
        
    }
}

export default ClassItem;
