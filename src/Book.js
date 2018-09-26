import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state  = {shelf: this.props.book.shelf}

    changeShelf(shelf){
        this.setState({ shelf })
        this.props.onChangeShelf(this.props.book, shelf)
    }

    render(){
        const { book } = this.props
        const selectedShelf = this.state.shelf || 'none'
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
                        <select value={selectedShelf} onChange={(event) => this.changeShelf(event.target.value)}>
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
}
export default Book
