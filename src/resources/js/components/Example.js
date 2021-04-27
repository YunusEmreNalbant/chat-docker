import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

function Example() {

    useEffect(() => {
        console.log("ok")
        window.Echo.channel('laravel_database_test_channel')
            .listen('.test', e => {
                console.log(e)
            })
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
               <div id={"chat-wrap"}>
                   <h2>chat</h2>
                   <div id={"chat-window"}>
                       <div id={"output"}></div>
                       <div id={"feedback"}></div>
                   </div>
                   <input type={"text"} id={"sender"} placeholder={"Ad"}/>
                   <input type={"text"} id={"message"} placeholder={"Mesaj"}/>
                   <button id={"submitBtn"}>GÖNDER</button>
               </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));
}
