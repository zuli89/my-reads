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


  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf title = "Currently Reading" books = {this.state.books.filter(b => b.shelf === 'currentlyReading') } moveBook={this.props.moveBook}/> 
          <Shelf title = "Want to Read" books = {this.state.books.filter(b => b.shelf === 'wantToRead') } moveBook={this.props.moveBook}/>
          <Shelf title = "Read" books = {this.state.books.filter(b => b.shelf === 'read')} moveBook={this.props.moveBook}/>
        </div>
          <FAB/>
      </div>
    );
  }
}

export default Home;