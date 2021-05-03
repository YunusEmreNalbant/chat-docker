import React from 'react';
import ChatPanel from "./ChatComponent/ChatPanel";
import UserList from "./ChatComponent/UserList";
import ReactDOM from 'react-dom'
import "./../../css/chat.css"

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: [], selectedUser: null, messages: [], typingDisplay: 'none'};
        this.selectUser = this.selectUser.bind(this);
        this.whisper = this.whisper.bind(this);
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.selectedUser !== this.state.selectedUser) {
            this.setState({messages: []});
            if (prevState.selectedUser && prevState.selectedUser.channel_name) {
                window.Echo.private('App.Models.Chat.' + prevState.selectedUser.channel_name).stopListening('.test');

            }
            window.Echo.private('App.Models.Chat.' + this.state.selectedUser.channel_name).listen('.test', (e) => {
                var messages1 = this.state.messages;
                messages1.push(JSON.stringify(e));
                this.setState({messages: messages1}, () => {
                    this.scrollToBottom();
                });
            }).listenForWhisper('typing', (e) => {
                console.log(e);
                e.typing ? this.setState({typingDisplay: 'block'}) : this.setState({typingDisplay: 'none'})
                setTimeout(() => {
                    this.setState({typingDisplay: 'none'})
                }, 3000)
            });


        }
    }

    scrollToBottom() {
        let objDiv = document.getElementById("msg_history");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    componentDidMount() {

        window.axios.get(window.staticUrl + 'friends').then(async (res) => {
            await this.setState({users: res.data.data});
        }).catch(err => {
            console.log(err);
        });
    }


    async selectUser(user) {
        await this.setState({selectedUser: user});
        await this.getMessages(this.state.selectedUser);
    }

    whisper(channel_name) {
        let channel = window.Echo.private('App.Models.Chat.' + channel_name)
        setTimeout(() => {
            channel.whisper('typing', {
                user: window.user_id,
                typing: true
            })
        }, 1000)
    }

    async getMessages(selectedUser) {
        if (selectedUser) {
            await window.axios.post(window.staticUrl + 'get-messages',
                {channel_name: this.state.selectedUser && this.state.selectedUser.channel_name}).then(async (res) => {
                await this.setState({messages: res.data});
                await this.scrollToBottom()

            })
        }

    }

    sendMessage(selectedUser, message) {
        window.axios.post(window.staticUrl + 'send-messages', {
            channel_name: selectedUser.channel_name,
            message: message
        }).then(res => console.log(res)).catch(err => {
            console.log(err);
        });
    }

    updateMessages(message) {
        console.log(message);
        //this.setState({messages: [...this.state.messages, message]})
    }

    render() {
        return (
            <div className={"container-fluid"} style={{marginTop: 10}}>
                <div className="messaging">
                    <div className="inbox_msg">
                        <UserList selectedUser={this.state.selectedUser} selectUser={this.selectUser}
                                  users={this.state.users}/>
                        <ChatPanel typingDisplay={this.state.typingDisplay}
                                   whisper={this.whisper} updateMessages={this.updateMessages}
                                   sendMessage={this.sendMessage}
                                   selectedUser={this.state.selectedUser}
                                   messages={this.state.messages}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Chat;
if (document.getElementById('example')) {
    ReactDOM.render(<Chat/>, document.getElementById('example'));
}
