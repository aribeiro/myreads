import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = { query: '', books: [] }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
    if(this.state.query.length > 1){
      BooksAPI.search(this.state.query).then(data => {
        this.setState({ books: data })
      })
    } else {
      this.setState({books: []})
    }
  }

  render(){
    const { query, books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book}
                  onChangeShelf={this.props.onChangeShelf} 
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks
