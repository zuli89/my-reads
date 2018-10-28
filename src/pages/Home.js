import React, { Component } from 'react'
import Shelf from '../components/Shelf'
import FAB from '../components/FAB'

class Home extends Component {
  
  render() { 
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf moveBook={this.props.moveBook} title = "Currently Reading" books = {this.props.books.filter(b => b.shelf === 'currentlyReading') } /> 
          <Shelf moveBook={this.props.moveBook} title = "Want to Read" books = {this.props.books.filter(b => b.shelf === 'wantToRead') }/>
          <Shelf moveBook={this.props.moveBook} title = "Read" books = {this.props.books.filter(b => b.shelf === 'read') } />
        </div>
          <FAB/>
      </div>
    );
  }
}

export default Home;