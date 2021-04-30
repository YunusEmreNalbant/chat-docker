import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import "./../../css/chat.css"
import ChatPanel from "./ChatComponent/ChatPanel";
import UserList from "./ChatComponent/UserList";

function Chat() {


    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);


    function getMessages(selectedUser) {
        if (selectedUser) {
            window.axios.post(window.staticUrl + 'get-messages', {channel_name: selectedUser && selectedUser.channel_name}).then(res => {
                setMessages(res.data);
            })
        }
    }

    async function sendMessage(message) {
        window.axios.post(window.staticUrl + 'send-messages', {
            channel_name: selectedUser && selectedUser.channel_name,
            message: message
        }).then(res => console.log(res)).catch(err => {
            console.log(err);
        });
    }

    function updateMessages(message) {
        setMessages([...messages,message]);
    }

    useEffect(() => {
        getMessages(selectedUser);
    }, [selectedUser])

    useEffect(() => {
        window.axios.get(window.staticUrl + 'friends').then(async (res) => {
            await setUsers(res.data.data);

        }).catch(err => {
            console.log(err);
        });


    }, [])

    return (
        <div className={"container-fluid"} style={{marginTop: 10}}>
            <div className="messaging">
                <div className="inbox_msg">
                    <UserList selectedUser={selectedUser} selectUser={setSelectedUser} users={users}/>
                    <ChatPanel updateMessages={updateMessages} sendMessage={sendMessage} selectedUser={selectedUser}
                               messages={messages}/>
                </div>
            </div>
            <ul>
                {messages.map(item=>(<li>{item.message}</li>))}

            </ul>
        </div>
    );
}

export default Chat;

if (document.getElementById('example')) {
    ReactDOM.render(<Chat/>, document.getElementById('example'));
}
