import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

import './App.css'

class BooksApp extends Component {
  state = { books: [] }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ books: data })
    })
  }
  
  changeShelf(book, shelf) {
    const { books } = this.state
    BooksAPI.update(book, shelf).then((data) => {
      const bookInBooks = books.find(b => b.id === book.id)

      if( bookInBooks ) {
        bookInBooks.shelf = shelf
      } else {
        BooksAPI.get(book.id).then(data => books.push(data))
      }
      this.setState({ books })
    })
  }

  render() {
    const { books } = this.state
    const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = books.filter(book => book.shelf === "wantToRead")
    const read = books.filter(book => book.shelf === "read")
    return (
      <div className="app">
        <Route exact path="/" render={ () =>  (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currenly Reading" books={currentlyReading} onChangeShelf={this.changeShelf.bind(this)} />
                <BookShelf title="Want to Read" books={wantToRead} onChangeShelf={this.changeShelf.bind(this)} />
                <BookShelf title="Read" books={read} onChangeShelf={this.changeShelf.bind(this)} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={ () => (
          <SearchBooks 
            books={books} 
            onChangeShelf={this.changeShelf.bind(this)} 
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
