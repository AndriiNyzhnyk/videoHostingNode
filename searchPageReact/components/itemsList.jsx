import {Fragment} from "react";

const React = require('react');
const SearchPlugin = require('./searchPlugin.jsx');

class ItemsList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items: this.props.data.items
        };

        this.filterList = this.filterList.bind(this);
    }

    filterList(text){
        let filteredList = this.props.data.items.filter( (item) => {
            if(item[0].toLowerCase().search(text.toLowerCase())!== -1) {
                return item;
            }

        });

        this.setState({items: filteredList});
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    render() {
        let valueInput = this.getCookie('searchMovie');

        if(this.state.items.length > 0 && this.props.data.serverResponse === true) {
            return (
                <Fragment>
                    <h2>{this.props.data.title}</h2>

                    <SearchPlugin filter={this.filterList} valueInput={valueInput}/>

                    <ul>
                        {
                            this.state.items.map( (item) => {
                                return (
                                    <li key={item}>
                                        <span>
                                            <img src={item[1]} alt="img" />
                                            <p>{item[0]}</p>
                                        </span>
                                    </li>
                                )
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