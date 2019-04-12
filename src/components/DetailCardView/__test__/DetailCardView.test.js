/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Store from '../../../reducers/context';
import reducer from '../../../reducers/todo';
import DetailCardView from '../index';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<DetailCardView />', () => {
  // const dispatch = jest.fn();

  describe('when it has complete data', () => {
    let state = {
      todos: [
        {
          id: 1,
          text: 'test1',
          isComplete: false,
          showingDetail: true,
          note: '',
          subtask: [],
          dueDate: '',
          importance: 'High',
        },
      ],
    };
    const dispatch = (action) => {
      state = reducer(state, action);
    };
    const testComp = mount(
      <Store.Provider value={(state, dispatch)}>
        <DetailCardView state={state} />
      </Store.Provider>,
    );

    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
