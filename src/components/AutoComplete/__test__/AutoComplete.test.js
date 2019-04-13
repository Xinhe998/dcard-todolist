/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Store from '../../../reducers/context';
import reducer from '../../../reducers/todo';
import AutoComplete from '../index';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<AutoComplete />', function () {
  let testComp;
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
  beforeEach(() => {
    jest.resetModules();
    this.params = {
      isOpen: true,
      switchHandler: jest.fn(),
      placeHolder: '',
      data: null,
    };

    this.makeSubject = () => {
      const {
        isOpen, switchHandler, placeHolder, data,
      } = this.params;

      testComp = mount(
        <Store.Provider value={(state, dispatch)}>
          <AutoComplete
            isOpen={isOpen}
            switchHandler={switchHandler}
            placeHolder={placeHolder}
            data={data}
          />
        </Store.Provider>,
      );
      return testComp;
    };
  });
  describe('when it has complete data', () => {
    beforeEach(() => {
      this.params.placeHolder = 'Test...';
      this.params.data = state.todos;
      this.subject = this.makeSubject();
    });
    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });

    it('test click event', async () => {
      await testComp.find('.AutoComplete__button').simulate('click');
      expect(this.params.switchHandler.mock.calls.length).toEqual(1);
    });

    it('test click event', async () => {
      await testComp
        .find('.AutoComplete__form__input')
        .simulate('focus')
        .simulate('change', { target: { value: 'test' } });
      expect(testComp.find('.AutoComplete__result-list').find('li')).toHaveLength(1);
    });
  });
});
