const reducer = (state, action) => {
    switch (action.type) {
    case 'ADD_TODO':
        if (!action.payload) {
            return state;
        }
        // return current state if duplicate
        if (state.todos.includes(action.payload)) {
            return state;
        }
        return {
            ...state,
            todos: [action.payload, ...state.todos],
        };

    case 'UPDATE_TODO_IS_COMPLETE':
        return {
            todos: state.todos.map((item) => {
                if (action.payload.id === item.id) {
                    return Object.assign({}, item, { isComplete: action.payload.isComplete });
                }
                return item;
            }),
        };
    case 'UPDATE_TODO_NAME':
        return {
            todos: state.todos.map((item) => {
                if (action.payload.id === item.id) {
                    return Object.assign({}, item, { text: action.payload.text });
                }
                return item;
            }),
        };

    case 'UPDATE_TODO_NOTE':
        return {
            todos: state.todos.map((item) => {
                if (action.payload.id === item.id) {
                    return Object.assign({}, item, { note: action.payload.note });
                }
                return item;
            }),
        };

    case 'DELETE_TODO':
        return {
            ...state,
            todos: state.todos.filter(t => t !== action.payload),
        };

    default:
        return state;
    }
};
export default reducer;
