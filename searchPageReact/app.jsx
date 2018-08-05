const React = require('react');
const ReactDOM = require('react-dom');
const ItemsList = require('./components/itemsList.jsx');
const axios = require('axios');

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Список Фільмів",
            serverResponse: false,
            items: []
        };
    }

    componentDidMount() {
        axios.get('/getMoviesForSearch').then((response) => {
            let movies = [];

            for(let i = 0; i < response.data.length; i++) {
                movies.push( [ (response.data[i][0] + ' (' + response.data[i][1] + ')'), response.data[i][2] ]);

            }

            this.setState({
                serverResponse: true,
                items: movies
            });
        });
    };


    render() {
        if(this.state.items.length > 0) {
            return <ItemsList data={this.state} />
        } else {
            return <h1>Завантаження даних ...</h1>
        }

    }
}


ReactDOM.render(
    <Main />, document.getElementById('app')
);