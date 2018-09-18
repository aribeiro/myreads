import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const ListBooks = (props) => { 
    const { books } = props
    const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = books.filter(book => book.shelf === "wantToRead")
    const read = books.filter(book => book.shelf === "read")
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currenly Reading" books={currentlyReading} onChangeShelf={props.onChangeShelf} />
                    <BookShelf title="Want to Read" books={wantToRead} onChangeShelf={props.onChangeShelf} />
                    <BookShelf title="Read" books={read} onChangeShelf={props.onChangeShelf} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}
export default ListBooks
