import React from 'react';
import User from "./User";



const UserList = (props) => {
    return (
        <div className="inbox_people">
            <div className="inbox_chat">
                {props.users.map(user => (
                    <User userStyle={props.selectedUser?.id == user.id ? true : false} key={user.id}
                          selectUser={props.selectUser} user={user}/>
                ))}
            </div>
        </div>
    );
};

export default UserList;
