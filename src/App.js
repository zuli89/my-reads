import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    books: []
  }

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
      <div className="app">
        <Switch>
          <Route exact path= {"/"} render={() => (
            <Home 
              books = {this.state.books}
              moveBook = {this.moveBook}
          /> )}/>
          <Route exact path= {"/search"} render={() => (
            <Search
              books = {this.state.books}
              moveBook = {this.moveBook}
          /> )}/>
        </Switch>
      </div>
    )
  }
}
export default BooksApp
