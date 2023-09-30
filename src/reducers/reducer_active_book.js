// state는 application state이 아니고, 그냥 state이다.
// 리듀서는 액션이 디스패치 할 때마다 호출됨
export default function(state = null, action) {     // es6문법: state 가 undefined이면 값을 할당한다.
    switch(action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }
    return state;
}