const React = require('react');

class SearchPlugin extends React.Component {
    constructor(props){
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(e){
        let text = e.target.value.trim();
        this.props.filter(text);
    }

    render() {
        return <input placeholder="Пошук" onChange={this.onTextChanged} />;
    }
}

module.exports = SearchPlugin;