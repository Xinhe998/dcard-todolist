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
                id: uuid(), text: newTask, isComplete: false, showingDetail: true, note: ''
            }));
            setNewTask('');
        }
    };
    var textareaRef = useRef();
    var taskNoteRef = useRef();
    useAutoSize(textareaRef);
    useAutoSize(taskNoteRef);
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
                                    dispatch(action.updateTodoIsComplete({ id: item.id, isComplete: !item.isComplete }));
                                }}
                                del={() => {
                                    dispatch(action.deleteTodoItem(item));
                                }}
                                handleClick={() => dispatch(action.setTaskShowingDetail({ id: item.id }))}
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
                                            className="CardScrollView__detail__title"
                                            ref={textareaRef}
                                            value={item.text}
                                            disabled={item.isComplete}
                                            onChange={e => dispatch(action.updateTodoName({
                                                id: item.id, text: (e.target.value ? e.target.value : item.text),
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
                                        <div className="CardScrollView__detail__block">
                                            <div className="CardScrollView__detail__block__title">Notes</div>
                                            <textarea
                                                className="CardScrollView__detail__block__textarea"
                                                ref={taskNoteRef}
                                                value={item.note}
                                                disabled={item.isComplete}
                                                onChange={e => dispatch(action.updateTodoNote({
                                                    id: item.id, note: e.target.value,
                                                }))}
                                                placeholder="Insert your notes here"
                                            />
                                        </div>
                                        <div className="CardScrollView__detail__block">
                                            <div className="CardScrollView__detail__block__title">SUB TASKS</div>
                                            {(item.subtask && item.subtask.length > 0
                                                ? (
                                                    item.subtask.map(task => (
                                                        <TodoItem
                                                            key={task.id}
                                                            text={task.text}
                                                            isComplete={task.isComplete}
                                                            allowEdit
                                                            onClickCheckbox={() => {
                                                                dispatch(action.updateTodoIsComplete({ id: task.id, isComplete: !task.isComplete }));
                                                            }}
                                                            del={() => {
                                                                dispatch(action.deleteTodoItem(task));
                                                            }}
                                                            EditInputPlaceholder="Add a new subtask"
                                                            handleEdit={e => dispatch(action.updateSubTask({
                                                                id: item.id,
                                                                subtask: {
                                                                    id: task.id,
                                                                    text: e.target.value,
                                                                    isComplete: false,
                                                                },
                                                            }))}
                                                        />
                                                    ))
                                                )
                                                : (
                                                    null
                                                )
                                            )}
                                            <TodoItem
                                                key={item.id}
                                                allowEdit
                                                onClickCheckbox={() => {
                                                    dispatch(action.updateTodoIsComplete({ id: item.id, isComplete: !item.isComplete }));
                                                }}
                                                del={() => {
                                                    dispatch(action.deleteTodoItem(item));
                                                }}
                                                EditInputPlaceholder="Add a new subtask"
                                                handleEdit={e => dispatch(action.addSubTask({
                                                    id: item.id,
                                                    subtask: {
                                                        id: uuid(),
                                                        text: e.target.value,
                                                        isComplete: false,
                                                    },
                                                }))}
                                            />
                                        </div>
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
