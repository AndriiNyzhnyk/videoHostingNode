const ReactDOM = require('react-dom');
const React = require('react');
const ItemsList = require('./components/itemsList.jsx');

const propsValues = {
    title: "Список Фільмів",
    items: [
        "Rampage",
        "Black Panther",
        "Peter Rabbit",
        "Blade Runner",
        "Central Intelligence",
        "Star Wars: The Last Jedi"
    ]
};

ReactDOM.render(
    <ItemsList data={propsValues} />, document.getElementById('app')
);