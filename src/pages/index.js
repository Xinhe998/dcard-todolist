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
  const { filter } = state;
  let stateAfterFilter = state;

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isImportanceModalOpen, setisImportanceModalOpen] = useState(false);
  const [isSortToolOpen, setIsSortToolOpen] = useState(false);
  const sortOptions = ['Time', 'Importance', 'Status'];
  const [isFilterToolOpen, setIsFilterToolOpen] = useState(false);
  const filterOptions = ['All', 'Active', 'Completed'];

  switch (filter) {
  case 'All':
    stateAfterFilter = state;
    break;
  case 'Active':
    stateAfterFilter = Object.assign({}, state, { todos: state.todos.filter(t => !t.isComplete) });
    break;
  case 'Completed':
    stateAfterFilter = Object.assign({}, state, { todos: state.todos.filter(t => t.isComplete) });
    break;
  default:
    stateAfterFilter = state;
    break;
  }

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
        {stateAfterFilter.todos.length ? (
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
