import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'


class BooksApp extends React.Component {

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
