import React, {useState, useEffect} from 'react';
import Message from "./Message";

const ChatPanel = (props) => {


    return (
        <div className="mesgs">
            <div className="msg_history">
                {
                    props.selectedUser ? (
                            <>
                                {props.messages?.map((item, index) => {
                                    if (item.from.id == window.user_id) {
                                        return <Message key={index} from={'me'} message={item.message}
                                                        time={'11:01 AM    |    June 9'}/>
                                    } else {
                                        return <Message key={index} from={'other'} message={item.message}
                                                        time={'11.01.2021'}/>
                                    }
                                })}
                            </>)
                        :
                        <h3>Henüz Bir Kişi Seçmediniz!</h3>
                }

            </div>
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message"/>
                    <button  onClick={(event) =>{ props.sendMessage(event.target.value); }} className="msg_send_btn"
                            type="button"><i
                        className="fa fa-paper-plane-o"
                        aria-hidden="true"></i></button>
                </div>
            </div>

        </div>
    );
};

export default ChatPanel;
