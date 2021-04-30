import React from 'react';

const Message = (props) => {
    if (props.from == "other") {
        return (
            <div className="incoming_msg">
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{props.message}</p>
                        <span className="time_date">{props.time}</span></div>
                </div>
            </div>
        );
    } else if (props.from == "me") {
        return (
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{props.message}</p>
                    <span className="time_date">{props.time}</span>
                </div>
            </div>
        )
    }
};

export default Message;
