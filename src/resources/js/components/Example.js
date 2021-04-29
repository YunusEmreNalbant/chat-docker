import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Example extends Component {

    constructor(props) {
        super(props);
        this.state={
            messages:[]
        }
    }
    componentDidMount() {
        try{
        Echo.channel(`laravel_database_NewMessage`)
            .listen('.test', (e) => {
                console.log(e);
            });
        }catch (e){
            console.log(e);
        }
        console.log('hellö');
    }

    render() {
        return (
            <div>
            </div>
        );
    }


}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));
}
