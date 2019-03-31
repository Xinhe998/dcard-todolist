import React, { useContext, useReducer, useState, useRef, useEffect } from 'react';
import reducer from '../reducers/todo';
import Store from '../reducers/context';
import * as action from '../actions/todoActions';
import './index.scss';
import useAutoSize from '../hooks/useAutoSize';

import Header from '../components/Header';
import TodoItem from '../components/TodoItem';
import PaneButton from '../components/PaneButton';

import calendarImg from '../assets/calendar.png';
import levelImg from '../assets/level.png';

const Home = () => {
    const globalStore = useContext(Store);
    const [state, dispatch] = useReducer(reducer, globalStore);
    const [newTask, setNewTask] = useState('');
    const [detailTaskName, setDetailTaskName] = useState('');
    const uuid = () => {
        let d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    const addTask = () => {
        if (newTask.trim() !== '') {
            dispatch(action.addTodoItem({
                id: uuid(), text: newTask, isComplete: false, showingDetail: true,
            }));
            setNewTask('');
        }
    };
    const textareaRef = useRef();
    useAutoSize(textareaRef);
    return (
        <Store.Provider value={{ state, dispatch }}>
            <Header title="TodoList" />
            <div className="AppContent">
                <h1 className="TasksToolBar__title">All Tasks</h1>
                <div className="CardScrollView CardScrollView--animatedIn1">
                    <div className="CardScrollView__list">
                        {state.todos.map(item => (
                            <TodoItem
                                key={item.id}
                                text={item.text}
                                isComplete={item.isComplete}
                                showGlow={item.showingDetail}
                                onClickCheckbox={() => {
                                    dispatch(action.updateTodoIsComplete({ id: item.id, text: item.text, isComplete: !item.isComplete }));
                                }}
                                del={() => {
                                    dispatch(action.deleteTodoItem(item));
                                }}
                            />
                        ))}
                    </div>
                    <form>
                        <div className="TaskAddBar">
                            <input
                                className="TaskAddBar__input"
                                placeholder="Add a task..."
                                value={newTask}
                                onChange={e => setNewTask(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTask(); } }}
                            />
                            <button
                                className="TaskAddBar__submitBtn"
                                type="submit"
                                onClick={(e) => { e.preventDefault(); addTask(); }}
                                disabled={!newTask.trim()}
                            >
                                +
                            </button>
                        </div>
                    </form>
                </div>
                <div className="CardScrollView CardScrollView--animatedIn2">
                    <div className="CardScrollView__detail">
                        {state.todos.map((item) => {
                            if (item.showingDetail) {
                                return (
                                    <>
                                        <textarea
                                            ref={textareaRef}
                                            value={item.text}
                                            disabled={item.isComplete}
                                            onChange={e => dispatch(action.updateTodoName({
                                                id: item.id, text: (e.target.value ? e.target.value : item.text), isComplete: item.isComplete, showingDetail: true,
                                            }))}
                                            onKeyPress={(e) => { 
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    textareaRef.current.blur();
                                                }
                                            }}
                                        />
                                        <PaneButton icon={calendarImg} text="Expiration date" />
                                        <PaneButton icon={levelImg} text="Importance" />
                                    </>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </Store.Provider>
    );
};

export default Home;
