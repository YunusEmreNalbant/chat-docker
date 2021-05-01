import React, {useEffect} from 'react';
import Message from "./Message";




const ChatPanel = (props) => {

    useEffect(() => {
        if (props.selectedUser) {
            window.Echo.channel('laravel_database_' + props.selectedUser.channel_name)
                .listen('.test', e => {
                    props.updateMessages(e);
                });

        }
    }, [props.selectedUser])



    function handleKeyPress(event) {
        if (props.selectedUser) {
            if (event.key === 'Enter') {
                props.sendMessage(event.target.value);
                event.target.value = '';
            }
        }
    }

    return (
        <div className="mesgs">
            <div className="msg_history">
                {
                    props.selectedUser ? (
                            <>
                                {props.messages?.map((item, index) => {

                                    if (JSON.parse(item).from == window.user_id) {
                                        console.log(JSON.parse(item));
                                        return <Message key={index} from={'me'} message={JSON.parse(item).message}
                                                        time={'11:01 AM    |    June 9'}/>
                                    } else {
                                        console.log()
                                        return <Message key={index} from={'other'} message={JSON.parse(item).message}
                                                        time={'11.01.2021'}/>
                                    }
                                })}
                            </>)
                        :
                        <h3>Henüz Bir Kişi Seçmediniz!</h3>
                }

            </div>
            {
                props.selectedUser ? <div className="type_msg">
                    <div className="input_msg_write">
                        <input type="text" onKeyPress={(event) => handleKeyPress(event)} className="write_msg"
                               placeholder="Type a message"/>

                    </div>
                </div> : null
            }


        </div>
    );
};

export default ChatPanel;
