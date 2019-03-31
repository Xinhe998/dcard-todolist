export const addTodoItem = payload => (
    { type: 'ADD_TODO', payload }
);

export const deleteTodoItem = payload => (
    { type: 'DELETE_TODO', payload }
);

export const updateTodoIsComplete = payload => (
    { type: 'UPDATE_TODO_IS_COMPLETE', payload }
);

export const updateTodoName = payload => (
    { type: 'UPDATE_TODO_NAME', payload }
);
