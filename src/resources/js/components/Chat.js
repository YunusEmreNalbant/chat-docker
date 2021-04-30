import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import "./../../css/chat.css"
import ChatPanel from "./ChatComponent/ChatPanel";
import UserList from "./ChatComponent/UserList";

function Chat() {


    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState(null);

    const changeSelectedUser = async (user) => {
        //selectedUser && selectedUser.id !== user.id ?  setSelectedUser(user) : null;
        // !selectedUser ?  setSelectedUser(user) : null;
        await setSelectedUser(user);
        await getMessages();

    }

    async function sendMessage(message) {
        window.axios.post(window.staticUrl + 'send-messages', {
            channel_name: selectedUser && selectedUser.channel_name,
            message: message
        }).then(res=>console.log(res))
    }

    async function getMessages() {
        window.axios.post(window.staticUrl + 'get-messages', {channel_name: selectedUser && selectedUser.channel_name}).then(res => {
            setMessages(res.data);
        })
    }


    useEffect(() => {
        window.Echo.channel('laravel_database_test_channel')
            .listen('.test', e => {
                console.log(e)
            })
        window.axios.get(window.staticUrl + 'friends').then(async (res) => {
            await setUsers(res.data.data);

        }).catch(err => {
            console.log(err);
        });


    }, [selectedUser])

    return (
        <div className={"container-fluid"} style={{marginTop: 10}}>
            <div className="messaging">
                <div className="inbox_msg">
                    <UserList selectedUser={selectedUser} selectUser={changeSelectedUser} users={users}/>
                    <ChatPanel sendMessage={sendMessage} selectedUser={selectedUser} messages={messages}/>
                </div>
            </div>
        </div>
    );
}

export default Chat;

if (document.getElementById('example')) {
    ReactDOM.render(<Chat/>, document.getElementById('example'));
}
