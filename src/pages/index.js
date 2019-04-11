import React, { useContext, useReducer, useState } from 'react';
import './index.scss';
import reducer from '../reducers/todo';
import Store from '../reducers/context';
import * as action from '../actions/todoActions';
import Header from '../components/Header';
import DatePickerModal from '../components/DatePickerModal';
import ImportanceModal from '../components/ImportanceModal';
import ListCardView from '../components/ListCardView';
import DetailCardView from '../components/DetailCardView';
import Dropdown from '../components/Dropdown';

import sortIcon from '../assets/sort.png';
import filterIcon from '../assets/filter.png';

const Home = () => {
  const globalStore = useContext(Store);
  const [state, dispatch] = useReducer(reducer, globalStore);
  const { filter, sortBy } = state;
  let stateAfterFilter = state;

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isImportanceModalOpen, setisImportanceModalOpen] = useState(false);
  const [isSortToolOpen, setIsSortToolOpen] = useState(false);
  const sortOptions = ['Status', 'Time', 'Importance'];
  const [isFilterToolOpen, setIsFilterToolOpen] = useState(false);
  const filterOptions = ['All', 'Active', 'Completed'];
  const sortByStatus = (sortArray) => {
    switch (sortBy) {
    case 'Status':
      console.log('!!');
      sortArray = sortArray.sort((item1, item2) => (item1.isComplete === item2.isComplete ? 0 : item1.isComplete ? 1 : -1),);
      return sortArray;
    case 'Time':
      sortArray = sortArray.sort(
        (item1, item2) => new Date(item1.dueDate) - new Date(item2.dueDate),
      );
      return sortArray;
    case 'Importance':
      var priorityArray = ['High', 'Medium', 'Low', ''];
      sortArray = sortArray.sort(
        (item1, item2) => {
          item1 = priorityArray.indexOf(item1.importance);
          item2 = priorityArray.indexOf(item2.importance);
          return item1 - item2;
        },
      );
      return sortArray;
    default:
      sortArray = sortArray.sort((item1, item2) => (item1.isComplete === item2.isComplete ? 0 : item1.isComplete ? 1 : -1),);
      return sortArray;
    }
  };
  switch (filter) {
  case 'All':
    stateAfterFilter = state;
    break;
  case 'Active':
    stateAfterFilter = Object.assign({}, state, {
      todos: state.todos.filter(t => !t.isComplete),
    });
    break;
  case 'Completed':
    stateAfterFilter = Object.assign({}, state, {
      todos: state.todos.filter(t => t.isComplete),
    });
    break;
  default:
    stateAfterFilter = state;
    break;
  }
  stateAfterFilter.todos = sortByStatus(stateAfterFilter.todos);

  const findCurrentTask = () => {
    let currentTask;
    state.todos.map((task) => {
      if (task.showingDetail) {
        currentTask = task;
      }
    });
    return currentTask;
  };
  const handleFilter = (status) => {
    dispatch(action.updateFilter(status));
  };
  const handleSort = (sorting) => {
    dispatch(action.updateSortBy(sorting));
  };
  return (
    <Store.Provider value={dispatch}>
      <Header title="TodoList" state={stateAfterFilter} />
      <div className="AppContent">
        <h1 className="TasksToolBar__title">All Tasks</h1>
        <div className="Toolbox">
          <Dropdown
            text="Sort by:  "
            icon={sortIcon}
            options={sortOptions}
            isOpen={isSortToolOpen}
            swichOptionHandler={setIsSortToolOpen}
            handleClickDispatch={handleSort}
          />
          <Dropdown
            text="Filter:  "
            icon={filterIcon}
            options={filterOptions}
            isOpen={isFilterToolOpen}
            swichOptionHandler={setIsFilterToolOpen}
            handleClickDispatch={handleFilter}
          />
        </div>
        <ListCardView state={stateAfterFilter} />
        {stateAfterFilter.todos ? (
          <DetailCardView
            state={stateAfterFilter}
            setIsDatePickerModalOpen={setIsDatePickerModalOpen}
            setisImportanceModalOpen={setisImportanceModalOpen}
          />
        ) : null}
      </div>
      <DatePickerModal
        isOpen={isDatePickerModalOpen}
        switchHandler={setIsDatePickerModalOpen}
        currentTask={() => findCurrentTask()}
      />
      <ImportanceModal
        isOpen={isImportanceModalOpen}
        switchHandler={setisImportanceModalOpen}
        currentTask={() => findCurrentTask()}
      />
    </Store.Provider>
  );
};

export default Home;
