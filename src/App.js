import React from 'react'
import {Switch, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'


class BooksApp extends React.Component {

  /*updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(book.shelf = shelf)
    }
  }*/
  

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path= {"/"} component = {Home}/>
          <Route exact path= {"/search"} component = {Search}/>
        </Switch>
      </div>
    )
  }
}
export default BooksApp
