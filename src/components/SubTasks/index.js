import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from '../../util';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import TodoItem from '../TodoItem';

const SubTasks = ({ item }) => {
  const dispatch = useContext(Store);
  return (
    <div className="CardScrollView__detail__block">
      <div className="CardScrollView__detail__block__title">SUB TASKS</div>
      {item.subtask && item.subtask.length > 0
        ? item.subtask.map(task => (
          <TodoItem
            key={task.id}
            text={task.text}
            isComplete={task.isComplete}
            allowEdit
            onClickCheckbox={() => {
              dispatch(
                action.updateTodoIsComplete({
                  id: task.id,
                  isComplete: !task.isComplete,
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
          />
        ))
        : null}
      <TodoItem
        key={item.id}
        allowEdit
        onClickCheckbox={() => {
          dispatch(
            action.updateTodoIsComplete({
              id: item.id,
              isComplete: !item.isComplete,
            }),
          );
        }}
        del={() => {
          dispatch(action.deleteTodoItem(item));
        }}
        EditInputPlaceholder="Add a new subtask"
        handleEdit={e => dispatch(
          action.addSubTask({
            id: item.id,
            subtask: {
              id: uuid(),
              text: e.target.value,
              isComplete: false,
            },
          }),
        )
        }
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
