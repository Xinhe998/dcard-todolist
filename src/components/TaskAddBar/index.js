import React, { useState, useContext } from 'react';
import uuid from '../../utils/uuid';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';

const TaskAddBar = () => {
  const [newTask, setNewTask] = useState('');
  const dispatch = useContext(Store);
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newId = uuid();
      dispatch(
        action.addTodoItem({
          id: newId,
          text: newTask.trimRight(),
          isComplete: false,
          showingDetail: true,
          note: '',
          subtask: [],
          dueDate: '',
          importance: '',
        }),
      );
      dispatch(action.setTaskShowingDetail({ id: newId }));
      setNewTask('');
    }
  };
  return (
    <form>
      <div className="TaskAddBar">
        <input
          className="TaskAddBar__input"
          placeholder="Add a task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTask();
            }
          }}
        />
        <button
          className="TaskAddBar__submitBtn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addTask();
          }}
          disabled={!newTask.trim()}
        >
          +
        </button>
      </div>
    </form>
  );
};

export default TaskAddBar;
