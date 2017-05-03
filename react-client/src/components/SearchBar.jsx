import React from 'react';


class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			address: ''
		};
	}

	onChange(event){
		this.setState({
			address:event.target.value
		});
	}

	  search() {
    this.props.onSearch(this.state.address);
  }

	render(){
		return(<div>
			<h1 id='prompt1'>Enter your address below and click "Search Address" to see how the political environment of where you live!</h1>
			<div id='prompt2'>Enter an address in format Street, City, State:</div> <input id = 'input' value={this.state.address} onChange={this.onChange.bind(this)}/>
			<button id="button" onClick={this.search.bind(this)}> Search Address </button>
			</div>)
	}
}

export default SearchBar;

