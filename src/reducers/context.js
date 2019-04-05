import React from 'react';

const Store = React.createContext({
  todos: [
    {
      id: 1,
      text: '吃飯',
      isComplete: false,
      showingDetail: true,
      note: '',
      subtask: [],
      dueDate: '',
    },
    {
      id: 2,
      text: '睡覺',
      isComplete: false,
      showingDetail: false,
      note: '',
      subtask: [],
      dueDate: '',
    },
    {
      id: 3,
      text: '吃飯睡覺打東東 吃飯睡覺打東東 吃飯睡覺打東東吃飯睡覺打東東',
      isComplete: false,
      showingDetail: false,
      note: '',
      subtask: [],
      dueDate: '',
    },
  ],
});

export default Store;
