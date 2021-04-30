import React from 'react';

const User = (props) => {
    return (
        <div className="chat_people" onClick={() => {props.selectUser(props.user)}}>
            <div className="chat_img"><img
                src="https://ptetutorials.com/images/user-profile.png"
                alt="sunil"/></div>
            <div className="chat_ib">
                <h5>{props.user.name}</h5>
                <p>-</p>
            </div>
        </div>
    );
};

export default User;
