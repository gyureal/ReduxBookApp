import React, {Component} from 'react';


export default class BookList extends Component {
    constructor() {

    }

    renderList() {
        return this.props.books.map(book => {
            return (
                <li key={book.title} className='list-group-item'>{book.title}</li>
            );
        });
    }

    render() {
        return (
            <ul className='list-group'>
                {this.renderList}
            </ul>
        )
    }
}