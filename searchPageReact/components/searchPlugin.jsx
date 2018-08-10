const React = require('react');

class SearchPlugin extends React.Component {
    constructor(props){
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);

        this.state = {
            text: this.props.valueInput,
            counter: 0
        };
    }

    onTextChanged(e){
        let text = e.target.value.trim();
        this.props.filter(text);
    }

    render() {
        if(this.state.counter === 0) {
            this.props.filter(this.state.text);

            this.setState({counter: 1});

            return (
                <input placeholder="Пошук" onChange={this.onTextChanged} value={this.state.text} />
            );
        } else {
            return (
                <input placeholder="Пошук" onChange={this.onTextChanged} />
            );
        }

    }
}

module.exports = SearchPlugin;