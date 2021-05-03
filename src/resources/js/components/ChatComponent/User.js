import React, {useState} from 'react';

const User = (props) => {


    return (
        <div style={props.userStyle ? {backgroundColor: '#f1f1f1'} : null} className="chat_list">

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
                {
                    props.user.is_new && <div style={{textAlign: 'right'}}>
                        <span className="badge rounded bg-success">Yeni Mesajınız Var</span>

                    </div>
                }

            </div>
        </div>
    );
};


export default User;
