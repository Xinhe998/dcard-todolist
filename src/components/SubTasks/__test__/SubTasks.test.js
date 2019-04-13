/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Store from '../../../reducers/context';
import SubTasks from '../index';

import uuid from '../../../utils/uuid';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<SubTasks />', function() {
  let testComp;
  const dispatch = jest.fn();
  beforeEach(() => {
    jest.resetModules();
    this.params = {
      item: {},
    };

    this.makeSubject = () => {
      const { item } = this.params;
      testComp = mount(
        <Store.Provider value={dispatch}>
          <SubTasks item={item} />
        </Store.Provider>,
      );
      return testComp;
    };
  });

  describe('when it has complete data', () => {
    beforeEach(async () => {
      // 給兩筆資料
      this.params.item = { id: uuid(), text: 'test1', isComplete: false };
      this.subject = await this.makeSubject();
    });

    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });

    it('should trigger dispatch when focus on edit input', () => {
      // const dispatch = jest.fn();
      testComp
        .find('.CardScrollView__item')
        .children()
        .find('.editInput')
        .simulate('focus');

      expect(dispatch).toBeCalledWith(
        expect.objectContaining({ type: 'ADD_SUB_TASK' }, { text: '' }),
      );
    });
  });
});
