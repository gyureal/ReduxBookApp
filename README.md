# 개요
> [Udemy - Modern React And Redux](https://www.udemy.com/react-redux/)를 학습한 내용을 기록하는 레포입니다.

## 학습목표
- 컴포넌트 기반 프론트엔드 프레임워크 사용에 있어 상태관리도구의 필요성
- Redux를 사용한 React 어플리케이션 상태관리


## 알고 있는 지식
- State는 컴포넌트의 상태를 저장한다.
- State가 변경되면 컴포넌트가 rerender 된다.
- State를 넘겨주려면 props 를 사용한다.
- props는 이벤트, 데이터 등을 담을  수 있다.
- 상태관리 라이브러리를 사용하면 props를 사용할 필요가 없다.

## 의문점
- 어떤 문제를 해결하려고 사용하는가?
- 사용방법은?
- 장점은 무엇인가?
- 단점은 무엇인가?
- 상태관리도구를 사용하면 props를 사용할 필요가 없나?

---

## 학습내용 (리덕스로 간단한 웹 어플리케이션 만들기)
### 상태 모델링
- 데이터를 담는 모델 부분과 화면을 보여주는 뷰를 분리하여 생각한다.


### Redux에 저장된 데이터를 React 컴포넌트에서 보여주기
- 용어
   - 리듀서
     > 리듀서는 데이터를 반환하는 Js 함수입니다. Redux State에 등록된 데이터를 사용할 수 있도록 반환합니다.
     <img width="702" alt="image" src="https://github.com/gyureal/ReduxSimpleStarter/assets/78974381/5c69094c-55ac-48c9-8a11-95d654a3c917">

   - Continer
     > 컨테이너는 Redux state에 바로 접근할 수 있는 Component를 말합니다.
   - react-redux
     > react와 redux를 연결해주는 라이브러리 입니다.

- 리듀서 등록
```javascript
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ActiveBook from './reducer_active_book';

// 리듀서 등록
const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBook
});

export default rootReducer;
```

- book reducer
```javascript
export default function() {
    return [
        {title: 'JavaScript: The God', pages: 101},
        {title: 'Harry Potter', pages: 100},
        {title: 'The Dark Knight', pages: 3},
        {title: 'eloquent Ruby', pages: 5}
    ]
}
```

```javascript
import React, {Component} from 'react';
import {connect} from 'react-redux';


class BookList extends Component {

    renderList() {
        return this.props.books.map(book => {
            return (
                <li 
                key={book.title}
                className='list-group-item'>{book.title}</li>
            );
        });
    }

    render() {
        return (
            <ul className='list-group col-md-4'>
                {this.renderList()}
            </ul>
        )
    }
}

// redux state를 props에 바인딩 시킨다.
function mapStateToProps(state) {
    return {
        books: state.books
    };
}

// react 컴포넌트와 redux state를 연결하여 export 한다.
export default connect(mapStateToProps)(BookList);
```





### 액션 & 액션 생성자
> 유저와 상호작용하여 데이터나 뷰가 변화하는 다이나믹한 뷰를 위해서 액션과 액션 생성자를 이용한다.

- 용어
   - 액션
     > 액션은 plain 자바스크립트 Object 이며, Type을 가진다.
   - 액션 생성자 (Action Creator)
     > 액션 생성자는 액션(Js Object)를 반환하는 함수이다.  

<img width="748" alt="image" src="https://github.com/gyureal/ReduxSimpleStarter/assets/78974381/c31b857d-79a9-4aba-b8e5-c5fb3ac012cb">

<img width="925" alt="image" src="https://github.com/gyureal/ReduxSimpleStarter/assets/78974381/05b99cba-727f-480f-b8b6-3231887c5bed">

- action : selectBook() 
```javascript
// selectBook은 Action Creator이고, 액션(plain 오프젝트)를 반환한다.
export function selectBook(book) {
    console.log('A book has been selected: ', book.title);
    // 액션은 타입 프로퍼티 오브젝트이다.
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}
```

- BookList Container
   - 리스트 OnClick 메서드에서 `액션 생성자를 호출한다.`
   - mapDispatchToProps 를 사용하여 redux state의 `action creator (selectBook)을 props에 바인딩`한다.
   - bindActionCreators 가 호출될 때 마다 모든 reducer 에게 액션이 전달된다.
```javascript
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
            <ul className='list-group col-md-4'>
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
```

- reducer (ActiveBookReducer)
   - 위 액션을 받아 처리하는 리듀서이다. 
```javascript
// state는 application state이 아니고, 그냥 state이다.
// 리듀서는 액션이 디스패치 할 때마다 호출됨
export default function(state = null, action) {     // es6문법: state 가 undefined이면 값을 할당한다.
    switch(action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }
    return state;
}
```

## 학습 내용 (리덕스 중급과정 - 미들웨어)
- 날씨 어플리케이션
<img width="839" alt="image" src="https://github.com/gyureal/ReduxSimpleStarter/assets/78974381/9c70be90-8b69-4a94-a6be-32c7ddcdb004">


