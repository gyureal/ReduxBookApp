import React, {Component} from 'react';
import {connect} from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';


class BookList extends Component {

    renderList() {
        return this.props.books.map(book => {
            return (
                <li 
                key={book.title}
                onClick={() => this.props.selectBook(book)} 
                className='list-group-item'>{book.title}</li>
            );
        });
    }

    render() {
        return (
            <ul className='list-group'>
                {this.renderList()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    };
}

// 이 함수로 부터 반환받은 값이 BookList의 props로 연결될 것입니다.
function mapDispatchToProps(dispatch) {
    // selectBook 이 호출될 때 마다 모든 reducer에게 전달된다.
    return bindActionCreators({ selectBook: selectBook}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);