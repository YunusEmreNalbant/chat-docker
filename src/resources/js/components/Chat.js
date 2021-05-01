import React from 'react';
import ChatPanel from "./ChatComponent/ChatPanel";
import UserList from "./ChatComponent/UserList";
import ReactDOM from 'react-dom'
import "./../../css/chat.css"

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: [], selectedUser: null, messages: []};
        this.selectUser = this.selectUser.bind(this);
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.selectedUser !== this.state.selectedUser) {
            window.Echo.channel('laravel_database_' + this.state.selectedUser.channel_name).listen('.test', (e) => {
                var messages1=this.state.messages;
                messages1.push(JSON.stringify(e));
                this.setState({messages:messages1});
            })
        }
    }

    componentDidMount() {

        window.axios.get(window.staticUrl + 'friends').then(async (res) => {
            await this.setState({users: res.data.data});
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
                {channel_name: this.state.selectedUser && this.state.selectedUser.channel_name}).then(res => {
                this.setState({messages: res.data});
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
