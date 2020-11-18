import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import { ClassRoom } from '../components';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        let class_id = this.props.match.params.class_id;
        this.setState({ readError: null });
        try {

            db.ref("/classrooms/" + class_id + "/chat_log").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        let class_id = this.props.match.params.class_id;
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("/classrooms/" + class_id + "/chat_log").push({
                content: this.state.content,
                timestamp: Date.now(),
                // uid: this.state.user.uid
            });
            this.setState({ content: '' });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render() {
        return (
            <div>
                <div className="chats">
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp}>{chat.content}</p>
                    })}
                </div>
                {/*{# message form #}*/}
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.content}/>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit">Send</button>
                </form>
                <div>
                    {/*Test_login in as: <strong>{this.state.user.email}</strong>*/}
                </div>
            </div>
        );
    }
}