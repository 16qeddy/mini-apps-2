import React, { Component } from "react";
import ReactDOM from "react-dom";

//http://localhost:3000/events?q=Greece&_page=2&_limit=2
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      query: '',
      page: 1
    }
  }

  render() {
    return (
      <div>hollo world</div>
    );
  }
}

export default App;

