import React from 'react';

const Store = React.createContext({
  todos: [
    {
      id: 1,
      text: '做Dcard作業',
      isComplete: false,
      showingDetail: true,
      note: '',
      subtask: [],
      dueDate: '',
      importance: 'High',
    },
    {
      id: 2,
      text: '好想上Dcard',
      isComplete: false,
      showingDetail: false,
      note: '',
      subtask: [],
      dueDate: '',
      importance: 'Medium',
    },
    {
      id: 3,
      text: '吃飯睡覺做Dcard作業  吃飯睡覺做Dcard作業  吃飯睡覺做Dcard作業  吃飯睡覺做Dcard作業',
      isComplete: false,
      showingDetail: false,
      note: '',
      subtask: [],
      dueDate: '',
      importance: '',
    },
  ],
  filter: 'All',
  sortBy: 'Status',
  detailCardViewShowingGlow: false,
});

export default Store;
