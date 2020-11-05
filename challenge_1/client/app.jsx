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
      currentPage: 0
    }
    this.getData = this.getData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
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
            <p>{pd.date}</p>
            <p>{pd.description}</p>
            <p>{pd.lang}</p>
            <p>{pd.category1}</p>
            <p>{pd.granularity}</p>
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
      this.getData()
    });

  };
  render() {
    return (
      <div>
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
    );
  }
}

export default App;

