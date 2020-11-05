import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from 'react-paginate';
import './app.css';
import axios from 'axios';


//http://localhost:3000/events?q=Greece&_page=2&_limit=2
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0,
      query: ''
    }
    this.getData = this.getData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(q) {
    if (q === undefined || q === '') {
      axios.get(`http://localhost:3000/events`)
        .then((res) => {
          console.log(res);
          const data = res.data;
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
          const postData = slice.map(pd => <div className="infoCard">
            <p>date: {pd.date}</p>
            <p>discription: {pd.description}</p>
            <p>Catagory: {pd.category2}</p>
          </div>)
          this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            data: postData
          })
        })
    } else {
      axios.get(`http://localhost:3000/events?q=${q}`)
        .then((res) => {
          console.log(res);
          const data = res.data;
          const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
          const postData = slice.map(pd => <div className="infoCard">
            <p>date: {pd.date}</p>
            <p>discription: {pd.description}</p>
            <p>Catagory: {pd.category2}</p>
          </div>)
          this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            data: postData
          })
        })
    }
  }
  handlePageClick(e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      if (this.state.query === '') {
        this.getData();
      } else {
        this.getData(this.state.query);
      }
    });

  };
  searchHandler(e) {
    this.setState({
      query: e.target.value
    })
    this.getData(this.state.query);
  }
  render() {
    return (
      <div className="appContainer">
        <div className="appCol">
          <input onChange={this.searchHandler} placeholder="search..."></input>
          {this.state.data}
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}

export default App;

