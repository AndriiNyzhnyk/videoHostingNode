import {Fragment} from "react";

const React = require('react');
const SearchPlugin = require('./searchPlugin.jsx');

class ItemsList extends React.Component {
    constructor(props){
        super(props);
        this.state = { items: this.props.data.items};

        this.filterList = this.filterList.bind(this);
    }

    filterList(text){
        let filteredList = this.props.data.items.filter(function(item){
            return item.toLowerCase().search(text.toLowerCase())!== -1;
        });

        this.setState({items: filteredList});
    }

    render() {
        if(this.state.items.length > 0 && this.props.data.serverResponse === true) {
            return(
                <Fragment>
                    <h2>{this.props.data.title}</h2>
                    <SearchPlugin filter={this.filterList} />
                    <ul>
                        {
                            this.state.items.map(function(item){
                                return <li key={item}>{item}</li>
                            })
                        }
                    </ul>
                </Fragment>
            );

        } else {
            return(
                <Fragment>
                    <h2>{this.props.data.title}</h2>
                    <SearchPlugin filter={this.filterList} />
                    <h3>За вашим запитом нічого не знайдено !</h3>
                </Fragment>
            );
        }
    }
}

module.exports = ItemsList;