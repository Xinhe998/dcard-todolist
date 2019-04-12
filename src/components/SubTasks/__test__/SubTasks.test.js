/* eslint-disable func-names */
import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SubTasks from '../index';

import uuid from '../../../utils/uuid';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<SubTasks />', function () {
  let testComp;
  beforeEach(() => {
    jest.resetModules();
    this.params = {
      item: [],
    };

    this.makeSubject = () => {
      const { item } = this.params;

      testComp = mount(<SubTasks item={item} />);
      return testComp;
    };
  });

  describe('when it has complete data', () => {
    beforeEach(() => {
      // 給兩筆資料
      this.params.item = [
        { id: uuid(), text: 'test1', isComplete: false },
        { id: uuid(), text: 'test2', isComplete: true },
      ];
      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      const wrapper = render(testComp);
      expect(wrapper).toMatchSnapshot();
    });
    // 測試會render兩個TodoItem
    it('should render two <TodoItem>', () => {
      expect(testComp.find('.CardScrollView__item').children()).toHaveLength(2);
    });
  });
});
