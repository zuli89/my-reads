import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Books from '../components/Books'

class Search extends Component {

  state = { // sets state for the query and array of books found when searched
    query: '',
    foundBooks: [],
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
        })
      };
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
          {this.state.foundBooks.length > 0 &&  //makes sure this is run only if thre's any books being searched for 
          this.state.foundBooks.map(book =>  {
            let shelfSearch = this.props.books.find(  // searches the books already on the shelf and matches the ones on the search page
              searchBook => searchBook.id === book.id
            );
            if (shelfSearch) {  //if there's any books on the search page that are on the shelf, it assings the value on the shelf
              book.shelf = shelfSearch.shelf; 
            } else {  //otherwise the value is set to none
              book.shelf = 'none'
            }
            return <Books moveBook = {this.props.moveBook} key= {book.id} book = {book} />
            })
           
          }
          {this.state.foundBooks.length === 0 && <span style = {{textAlign: "center"}}> No results found </span>} 
        </ol>
      </div>
    </div>
    );
  }
}

export default Search;


