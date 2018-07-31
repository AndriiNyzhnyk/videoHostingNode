const React = require('react');
const ReactDOM = require('react-dom');
const ItemsList = require('./components/itemsList.jsx');
const axios = require('axios');

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = { title: "Список Фільмів", items: [] };
    }

    componentDidMount() {
        axios.get('/getMoviesForSearch').then((response) => {
            let data = [];

            for(let i = 0; i < response.data.length; i++) {
                data.push(response.data[i][0] + ' (' + response.data[i][1] + ')');
            }

            this.setState({items: data});
        });
    };

    render() {
        if(this.state.items.length > 0) {
            return <ItemsList data={this.state} />
        } else {
            return <h1>Нажаль пошук фільмів зараз не доступний !</h1>
        }

    }
}


ReactDOM.render(
    <Main />, document.getElementById('app')
);