import React from 'react'

const Book = ({ book, onChangeShelf }) => {
    const selectedShelf = book.shelf || 'none'
    const authors = book.authors && book.authors.join(", ")
    const url = book.imageLinks && book.imageLinks.smallThumbnail ?
        book.imageLinks.smallThumbnail : ''

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128,
                    height: 193,
                    backgroundImage: `url(${url})` }}></div>
                <div className="book-shelf-changer">
                    <select value={selectedShelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    )
}
export default Book
