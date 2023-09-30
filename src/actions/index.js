// selectBook은 Action Creator이고, 액션(plain 오프젝트)를 반환한다.
export function selectBook(book) {
    console.log('A book has been selected: ', book.title);
    // 액션은 타입 프로퍼티 오브젝트이다.
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}