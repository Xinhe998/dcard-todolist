import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from '../../utils';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import TodoItem from '../TodoItem';

const SubTasks = ({ item }) => {
  const dispatch = useContext(Store);
  const shouldFocusRef = useRef();
  const focusWhenAdd = () => {
    setTimeout(() => {
      if (shouldFocusRef.current) shouldFocusRef.current.focus();
    }, 0);
  };
  return (
    <div className="CardScrollView__detail__block">
      <div className="CardScrollView__detail__block__title">SUB TASKS</div>
      {item.subtask && item.subtask.length > 0
        ? item.subtask.map((task, index) => (
          <TodoItem
            key={task.id}
            text={task.text}
            isComplete={task.isComplete}
            allowEdit
            inputRef={
              item.subtask.length === index + 1 ? shouldFocusRef : null
            }
            onClickCheckbox={() => {
              dispatch(
                action.updateSubTask({
                  id: item.id,
                  subtask: {
                    id: task.id,
                    isComplete: !task.isComplete,
                  },
                }),
              );
            }}
            del={() => {
              dispatch(action.deleteTodoItem(task));
            }}
            EditInputPlaceholder="Add a new subtask"
            handleEdit={e => dispatch(
              action.updateSubTask({
                id: item.id,
                subtask: {
                  id: task.id,
                  text: e.target.value,
                  isComplete: false,
                },
              }),
            )
            }
            handleBlur={(e) => {
              if (!e.target.value) {
                dispatch(action.deleteSubTask({
                  id: item.id,
                  subtask: {
                    id: task.id,
                  },
                }));
              }
            }}
          />
        ))
        : null}
      <TodoItem
        key={item.id}
        allowEdit
        EditInputPlaceholder="Add a new subtask"
        handleFocus={(e) => {
          dispatch(
            action.addSubTask({
              id: item.id,
              subtask: {
                id: uuid(),
                text: e.target.value,
                isComplete: false,
              },
            }),
          );
          focusWhenAdd();
        }}
        
      />
    </div>
  );
};

SubTasks.propTypes = {
  item: PropTypes.object,
};

SubTasks.defaultProps = {
  item: null,
};
export default SubTasks;
