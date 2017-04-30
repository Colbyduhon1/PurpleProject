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
			<h1>Enter your address below!</h1>
			Enter an address in format Street, City, State: <input value={this.state.address} onChange={this.onChange.bind(this)}/>
			<button onClick={this.search.bind(this)}> Search Zip </button>
			</div>)
	}
}

export default SearchBar;

