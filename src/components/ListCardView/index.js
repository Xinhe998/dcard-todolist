import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import TodoItem from '../TodoItem';
import TaskAddBar from '../TaskAddBar';

const ListCardView = ({ state }) => {
  const dispatch = useContext(Store);
  const dateFormat = 'MMM D';
  const convertImportance = (importance) => {
    switch (importance) {
    case 'High':
      return '!!!';
    case 'Medium':
      return '!!';
    case 'Low':
      return '!';
    default:
      break;
    }
  };
  return (
    <div className="CardScrollView CardScrollView--animatedIn1">
      <div className="CardScrollView__list">
        {state.todos.map(item => (
          <TodoItem
            key={item.id}
            text={item.text}
            isComplete={item.isComplete}
            showGlow={item.showingDetail}
            date={item.dueDate ? format(item.dueDate, dateFormat) : ''}
            importance={convertImportance(item.importance)}
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
            handleClick={() => dispatch(action.setTaskShowingDetail({ id: item.id }))
            }
          />
        ))}
      </div>
      <TaskAddBar />
    </div>
  );
};

ListCardView.propTypes = {
  state: PropTypes.object,
};

ListCardView.defaultProps = {
  state: null,
};
export default ListCardView;
