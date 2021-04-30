import React from 'react';
import User from "./User";

const UserList = (props) => {
    return (
        <div className="inbox_people">
            <div className="inbox_chat">
                <div className="chat_list">
                    {props.users.map(user => (
                        <User key={user.id} selectUser={props.selectUser} user={user}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
