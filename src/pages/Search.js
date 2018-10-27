import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Books from '../components/Books'


class Search extends Component {

  state = { // sets state for the query and array of books found when searched
    query: '',
    foundBooks: [],
    books: []
  }


  moveBook = (book, shelf) => { //updates book category so it can move between shleves
    BooksAPI.update(book, shelf) //gets update method
    .then(() => {
      book.shelf = shelf;
      this.setState(state => ({ //sets a new state for the books when book is updated
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  updateQuery = (query) => {  // function to update the state of the query and run updateSearch()
    this.setState({
      query: query
    },
    this.updateSearch)
  }

  updateSearch() { // 
    if (this.state.query === '' || this.state.query === undefined) {//if array is empty, no books will be returned
      return this.setState({ 
        foundBooks : []
      });
    }
    BooksAPI.search(this.state.query.trim()) //runs search method from BooksAPI when something typed
    .then((book) => {     
      console.log(book);
      if (book.error) {
        this.setState({ 
          foundBooks : []
        });
      } else {
        this.setState({ //response is used to set state of the foundBooks array that will include book results
        foundBooks: book
        })};
    })
  }

  render() {
      return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value = {this.state.query} onChange={(e) => 
              (this.updateQuery(e.target.value))} />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.foundBooks.length > 0 && this.state.foundBooks.map((book, key) => <Books moveBook = {this.moveBook} key= {key} book = {book} />)}
        </ol>
      </div>
    </div>
    );
  }
}

export default Search;