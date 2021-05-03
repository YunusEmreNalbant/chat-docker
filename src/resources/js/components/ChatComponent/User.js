import React, {useState} from 'react';

const User = (props) => {


    return (
        <div style={props.userStyle ? {backgroundColor:'gray'} : null} className="chat_list">

            <div className="chat_people mb-3" onClick={() => {
               props.selectUser(props.user)
            }}>
                <div className="chat_img"><img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"/></div>
                <div className="chat_ib">
                    <h5>{props.user.name}</h5>
                    <p>-</p>
                </div>
            </div>
        </div>
    );
};


export default User;
