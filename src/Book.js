import React, { Component } from 'react'

class Book extends Component {
  handleChangeShelf = (e) => {
    if(this.props.onChangeShelf){
      this.props.onChangeShelf(this.props.book, e.target.value)
    }
  }

  render(){
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={ book.shelf || 'none' } onChange={this.handleChangeShelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author && book.author.join(", ")}</div>
      </div>
    )
  }
}
export default Book
