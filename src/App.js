import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

import './App.css'

class BooksApp extends React.Component {
  state = { books: [] }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ books: data })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={ () => (
          <SearchBooks />
        )} />
        <Route exact path="/" render={ () =>  (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currenly Reading" />
                <BookShelf title="Want to Read" />
                <BookShelf title="Read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
