
import React, {Component} from "react";
import {auth, db} from "../services/firebase";
import "../styles.css"

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth.currentUser,
            full_name: null,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        let class_id;
        try{
            class_id = this.props.props.match.params.class_id;
        } catch {
            // For testing purposes
            class_id = "MATH8056"
        }

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

        try {
            db.ref("/users").on("value", snapshot => {
                let full_name = null;
                snapshot.forEach((snap) => {
                    if(snap.val().uid === this.state.user.uid){
                        full_name = snap.val().fname + " " + snap.val().lname;
                    }
                });

                this.setState({ full_name }, () => console.log(this.state.full_name));
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
        let class_id = this.props.props.match.params.class_id;
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("/classrooms/" + class_id + "/chat_log").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
                name: this.state.full_name
            });
            this.setState({ content: '' });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        return `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    }

    render() {
        return (
            <div>
                <div className="chat-area">
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                            {chat.content}
                            <br />
                            <span className="full-name float-left">{chat.name}</span>
                            <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                        </p>
                    })}
                </div>
                {/*{# message form #}*/}
                <form className="chat-input mx-3"  onSubmit={this.handleSubmit}>
                    <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}/>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit" className="btnn btn-submit px-5 mt-4">Send</button>
                </form>
                <div className="py-5 mx-3">
                    {/*Test_login in as: <strong>{this.state.user.email}</strong>*/}
                </div>
            </div>
        );
    }
}