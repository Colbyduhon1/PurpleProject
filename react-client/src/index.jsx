import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }


  search (address) {
    console.log(`${address} was searched`);
    console.log(JSON.stringify(address));
    $.ajax({
      method: "POST",
      url: '/items/import',
      data: {address: address},
      success: function(data, status){
        console.log("DATA" + data);
        console.log('Post successful');
      },
      error: function(err){
        console.log('Post failed')
      }
    });
  }

  render () {
    return (<div>
      <h1>Purple</h1>
      <SearchBar onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));




