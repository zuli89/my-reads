import React, { Component } from 'react';
import Shelf from './Shelf';
import { update } from '../BooksAPI';


class Books extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moveBook: (book, shelf) => {console.log(book,shelf)}
    }
  }

  updateBook = async event => {
    let shelf = event.target.value;
    let book = this.props
    let result = await update({book},shelf)
    this.state.moveBook(book, shelf)
    }
  
  render() {
    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" 
          style={{ 
            width: 128, 
            height: 193, 
            backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
            }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.updateBook} value = {this.props.shelf || "none"}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors[0]}</div>
      </div>
    </li>
    );
  }
}

export default Books;