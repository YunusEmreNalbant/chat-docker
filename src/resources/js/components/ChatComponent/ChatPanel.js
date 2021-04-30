import React from 'react';
import Message from "./Message";

const ChatPanel = (props) => {
    return (
        <div className="mesgs">
            <div className="msg_history">
                {
                    props.selectedUser ? (<><Message from={'other'} message={'test'} time={'11.01.2021'}/>
                            <Message from={'me'} message={'ben gönderdim'} time={'11:01 AM    |    June 9'}/>
                            <Message from={'me'} message={'ben gönderdim'} time={'11:01 AM    |    June 9'}/>
                            <Message from={'me'} message={'ben gönderdim'} time={'11:01 AM    |    June 9'}/>
                            <Message from={'me'} message={'ben gönderdim'} time={'11:01 AM    |    June 9'}/>
                            <Message from={'other'} message={'test'} time={'11.01.2021'}/></>) :
                        <h3>Henüz Bir Kişi Seçmediniz!</h3>
                }

            </div>
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message"/>
                    <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o"
                                                                      aria-hidden="true"></i></button>
                </div>
            </div>

        </div>
    );
};

export default ChatPanel;
