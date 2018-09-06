import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

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
    return (
      <div className="app">
        <Route exact path="/" render={ () =>  (
          <ListBooks
            books={books} 
            onChangeShelf={this.changeShelf.bind(this)} 
          />

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
