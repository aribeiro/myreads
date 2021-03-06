import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce';

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '', books: [] }
        this.debounceSearchBooks = debounce(500, this.searchBooks);
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({query})
        if(query.trim().length > 1){
            this.debounceSearchBooks(query.trim())
        }
    }

    searchBooks = (query) => {
        const { books } = this.props
        BooksAPI.search(query).then(data => {
            if(data !== undefined && data.error !== "empty query"){
                this.setState({books: this.appendShelf(data, books)})
            } else {
                this.setState({books: []})
            }
        })
    }

    appendShelf = (books, booksInShelfs) => (
        books.map(book => {
            const bookInShelf = booksInShelfs.find(b => b.id === book.id)
            if(bookInShelf) {
                book.shelf = bookInShelf.shelf
            }
            return book
        })
    )

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
