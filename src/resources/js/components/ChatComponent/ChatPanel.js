import React, {Component} from 'react';
import Message from "./Message";

class ChatPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: null
        }
        const messagesEndRef = React.createRef()

    }


    handleKeyPress(event) {
        if (this.props.selectedUser && this.props.selectedUser.channel_name) {
            if (event.key === 'Enter') {
                this.props.sendMessage(this.props.selectedUser, event.target.value);
                event.target.value = '';
            } else {
                this.props.whisper(this.props.selectedUser.channel_name);
            }

        }
    }


    render() {
        return (<div className="mesgs">
            <div id={"msg_history"} className="msg_history">

                {
                    this.props.selectedUser ? (
                            <>
                                <p id={'typing'}
                                   style={{display: this.props.typingDisplay}}>{this.props.selectedUser.name} Yazıyor...</p>
                                <>
                                    {this.props.messages?.map((item, index) => {

                                        if (JSON.parse(item).from == window.user_id) {
                                            return <Message key={index} from={'me'} message={JSON.parse(item).message}
                                                            time={'11:01 AM    |    June 9'}/>
                                        } else {
                                            return <Message key={index} from={'other'} message={JSON.parse(item).message}
                                                            time={'11.01.2021'}/>
                                        }
                                    })}
                                </>
                            </>)
                        :
                        <h3>Henüz Bir Kişi Seçmediniz!</h3>
                }

            </div>
            {
                this.props.selectedUser ? <div className="type_msg">
                    <div id={"typing"}></div>
                    <div className="input_msg_write">
                        <input id={"text"} type="text" onKeyPress={(event) => this.handleKeyPress(event)}
                               className="write_msg"
                               placeholder="Type a message"/>

                    </div>
                </div> : null
            }


        </div>)
    }

}

export default ChatPanel
