import React, {
  useContext,
  useReducer,
  useState,
} from 'react';
import './index.scss';
import reducer from '../reducers/todo';
import Store from '../reducers/context';

import Header from '../components/Header';
import DatePickerModal from '../components/DatePickerModal';
import ImportanceModal from '../components/ImportanceModal';
import ListCardView from '../components/ListCardView';
import DetailCardView from '../components/DetailCardView';

const Home = () => {
  const globalStore = useContext(Store);
  const [state, dispatch] = useReducer(reducer, globalStore);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isImportanceModalOpen, setisImportanceModalOpen] = useState(false);
  const findCurrentTask = () => {
    let currentTask;
    state.todos.map((task) => {
      if (task.showingDetail) { currentTask = task; }
    });
    return currentTask;
  };
  return (
    <Store.Provider value={dispatch}>
      <Header title="TodoList" />
      <div className="AppContent">
        <h1 className="TasksToolBar__title">All Tasks</h1>
        <ListCardView state={state} />
        <DetailCardView
          state={state}
          setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          setisImportanceModalOpen={setisImportanceModalOpen}
        />
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
