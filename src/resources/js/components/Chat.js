import React, {Component} from 'react';
import ChatPanel from "./ChatComponent/ChatPanel";
import UserList from "./ChatComponent/UserList";
import ReactDOM from 'react-dom'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: [], selectedUser: null, messages: []};
    }

    componentDidMount() {
        console.log("ok")
        window.axios.get(window.staticUrl + 'friends').then(async (res) => {
            await this.setState(res.data.data);

        }).catch(err => {
            console.log(err);
        });


    }

    selectUser(user) {
        this.setState({selectedUser: user}, () => {
            this.getMessages(this.state.selectedUser)
        });

    }

    getMessages(selectedUser) {
        if (selectedUser) {
            window.axios.post(window.staticUrl + 'get-messages',
                {channel_name: selectedUser && selectedUser.channel_name}).then(res => {
                this.setState(res.data);
            })
        }
    }

    sendMessage(message) {
        window.axios.post(window.staticUrl + 'send-messages', {
            channel_name: this.state.selectedUser.channel_name,
            message: message
        }).then(res => console.log(res)).catch(err => {
            console.log(err);
        });
    }

    updateMessages(message) {
        // setMessages([...messages,message]);
        this.setState([...this.state.messages, message])
    }

    render() {

        return (
            <div className={"container-fluid"} style={{marginTop: 10}}>
                <div className="messaging">
                    <div className="inbox_msg">
                        <UserList selectedUser={this.state.selectedUser} users={this.state.users}/>
                        <ChatPanel updateMessages={this.updateMessages} sendMessage={this.sendMessage}
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
