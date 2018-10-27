import React, { Component } from 'react'
import Shelf from '../components/Shelf'
import FAB from '../components/FAB'
import * as BooksAPI from '../BooksAPI'


class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  //get all books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books:books
      });
      console.log(books);
    })
    
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

  render() { 
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf moveBook={this.moveBook} title = "Currently Reading" books = {this.state.books.filter(b => b.shelf === 'currentlyReading') } /> 
          <Shelf moveBook={this.moveBook} title = "Want to Read" books = {this.state.books.filter(b => b.shelf === 'wantToRead') }/>
          <Shelf moveBook={this.moveBook} title = "Read" books = {this.state.books.filter(b => b.shelf === 'read') } />
        </div>
          <FAB/>
      </div>
    );
  }
}

export default Home;