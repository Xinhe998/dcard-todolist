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
          return Object.assign({}, item, {
            isComplete: action.payload.isComplete,
          });
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

  case 'DELETE_SUB_TASK':
    return {
      ...state,
      todos: state.todos.map((item) => {
        if (action.payload.id === item.id) {
          item.subtask = item.subtask.filter(t => t.id !== action.payload.subtask.id);
          return Object.assign({}, item);
        }
        return item;
      }),
    };

  case 'ADD_SUB_TASK':
    return {
      todos: state.todos.map((item) => {
        if (action.payload.id === item.id) {
          item.subtask = [...item.subtask, action.payload.subtask];
          return Object.assign({}, item);
        }
        return item;
      }),
    };

  case 'UPDATE_SUB_TASK':
    return {
      todos: state.todos.map((item) => {
        if (action.payload.id !== item.id) {
          return item;
        }
        const actionItem = {
          subtask: item.subtask.map((task) => {
            if (action.payload.subtask.id !== task.id) {
              return task;
            }
            return { ...task, ...action.payload.subtask };
          }),
        };
        return { ...item, ...actionItem };
      }),
    };

  case 'SHOWING_DETAIL':
    return {
      todos: state.todos.map((item) => {
        if (action.payload.id === item.id) {
          item.showingDetail = true;
          return Object.assign({}, item);
        }
        item.showingDetail = false;
        return item;
      }),
    };

  case 'FIRST_TASK_SHOWING_DETAIL':
    return {
      todos: state.todos.map((item, index) => {
        if (index === 0) {
          item.showingDetail = true;
          return Object.assign({}, item);
        }
        item.showingDetail = false;
        return item;
      }),
    };

  case 'UPDATE_IMPORTANCE':
    return {
      todos: state.todos.map((item) => {
        if (action.payload.id === item.id) {
          return Object.assign({}, item, { importance: action.payload.importance });
        }
        return item;
      }),
    };

  case 'UPDATE_DUE_DATE':
    return {
      todos: state.todos.map((item) => {
        if (action.payload.id === item.id) {
          return Object.assign({}, item, { dueDate: action.payload.dueDate });
        }
        return item;
      }),
    };

  default:
    return state;
  }
};
export default reducer;
