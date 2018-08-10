// import {Fragment} from "react";

const React = require('react');
const Fragment = React.Fragment;
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

    redirectMovie(e) {
        let src = e.target.attributes.src.value;
        let movie = src.slice(12, -4);
        window.location.href = `movie/${movie}`;
    }

    render() {
        let valueInput = this.getCookie('searchMovie');

        if(this.state.items.length > 0 && this.props.data.serverResponse === true) {
            return (
                <Fragment>
                    <header>
                        <SearchPlugin filter={this.filterList} valueInput={valueInput}/>
                        <h3 id="textTitle">{this.props.data.title}</h3>
                    </header>


                    <div id="searchMonitor">
                        {
                            this.state.items.map( (item) => {
                                return (
                                    <div className="item" key={item} onClick={this.redirectMovie}>
                                        <img src={item[1]} alt="img" />
                                        <p>{item[0]}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </Fragment>
            );

        } else {
            return(
                <Fragment>
                    <header>
                        <SearchPlugin filter={this.filterList} />
                        <h3 id="textTitle">{this.props.data.title}</h3>
                    </header>
                    <p id="notResult">За вашим запитом нічого не знайдено !</p>
                </Fragment>
            );
        }
    }
}

module.exports = ItemsList;