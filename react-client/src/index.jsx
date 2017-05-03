import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ListItem from './components/ListItem.jsx';
import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      item: [],
    }
  }


  search (address) {
    console.log(`${address} was searched`);
    console.log(JSON.stringify(address));
    $.ajax({
      method: "POST",
      url: '/items/import',
      data: {address: address}
    })
  .then($.ajax({
      url: '/items',
      method: 'GET',
      success: (data) => {
        console.log('Going to get now')
        console.dir(data);
        this.setState({
          item: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    }));
  }


  render () {
    return (<div>
      <h1 id='heading'>Purple</h1>
      <SearchBar onSearch={this.search.bind(this)}/>
      <ListItem item={this.state.item}/>
    }
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));




