import React, { Component } from "react";
import Nav from "./components/Nav";
import SearchArea from "./components/SearchArea";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import MovieInfo from "./components/MovieInfo";
import "./App.css";

// ========== //

class App extends Component {
  // STATE
  constructor() {
    super();
    this.state = {
      movies: [],
      searchTerm: "",
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
    };
    this.apiKey = process.env.REACT_APP_API;
  }
  // FUNCTION
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results,
        });
      });
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  nextPage = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: [...data.results], currentPage: pageNumber });
      });
  };

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter((movie) => movie.id == id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie });
  };

  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  };

  // RENDER
  render() {
    const numberPage = Math.floor(this.state.totalResults / 20);
    return (
      <>
        <div className="App">
          <Nav />
          {this.state.currentMovie == null ? (
            <div>
              <SearchArea
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              />
              <MovieList
                movies={this.state.movies}
                viewMovieInfo={this.viewMovieInfo}
              />
            </div>
          ) : (
            <MovieInfo
              currentMovie={this.state.currentMovie}
              closeMovieInfo={this.closeMovieInfo}
            />
          )}

          {this.state.totalResults > 20 && this.state.currentMovie == null ? (
            <Pagination
              pages={numberPage}
              nextPage={this.nextPage}
              currentPage={this.currentPage}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default App;

// import logo from "./logo.svg";
{
  /* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" /> */
}
{
  /* <a
  className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Movie Search Engine
            </a> */
}
{
  /* <h1>Movie Search Engine</h1> */
}
{
  /* </header> */
}
