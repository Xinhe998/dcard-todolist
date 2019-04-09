export const addTodoItem = payload => ({ type: 'ADD_TODO', payload });

export const deleteTodoItem = payload => ({ type: 'DELETE_TODO', payload });

export const updateTodoIsComplete = payload => ({
  type: 'UPDATE_TODO_IS_COMPLETE',
  payload,
});

export const updateTodoName = payload => ({
  type: 'UPDATE_TODO_NAME',
  payload,
});

export const updateTodoNote = payload => ({
  type: 'UPDATE_TODO_NOTE',
  payload,
});

export const addSubTask = payload => ({ type: 'ADD_SUB_TASK', payload });

export const updateSubTask = payload => ({ type: 'UPDATE_SUB_TASK', payload });

export const setTaskShowingDetail = payload => ({
  type: 'SHOWING_DETAIL',
  payload,
});

export const updateDueDate = payload => ({
  type: 'UPDATE_DUE_DATE',
  payload,
});

export const deleteSubTask = payload => ({
  type: 'DELETE_SUB_TASK',
  payload,
});

export const updateSubTaskIsComplete = payload => ({
  type: 'UPDATE_SUB_TASK_IS_COMPLETE',
  payload,
});

export const updateImportance = payload => ({ type: 'UPDATE_IMPORTANCE', payload });
