/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaneButton from '../index';

import calendar from '../../../assets/calendar.png';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<PaneButton />', function () {
  let testComp;
  beforeEach(() => {
    jest.resetModules();
    this.params = {
      icon: null,
      text: '',
      handleClick: jest.fn(),
      disabled: false,
    };

    this.makeSubject = () => {
      const {
        icon, text, handleClick, disabled,
      } = this.params;

      testComp = shallow(
        <PaneButton
          icon={icon}
          text={text}
          handleClick={handleClick}
          disabled={disabled}
        />,
      );
      return testComp;
    };
  });

  describe('when it has complete data', () => {
    beforeEach(() => {
      this.params.icon = calendar;
      this.params.text = 'Test';
      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });
    // 測試找到一個<button>
    it('should render one <button>', () => {
      expect(testComp.find('button')).toHaveLength(1);
    });
    // 測試icon
    it('should render icon', () => {
      expect(testComp.find('img').prop('src')).toEqual(calendar);
    });
    // 測試text
    it('should render text', () => {
      expect(testComp.find('.PaneBtn__label').text()).toEqual('Test');
    });
    // 測試handleClick
    it('test click event', () => {
      testComp.simulate('click');
      expect(this.params.handleClick.mock.calls.length).toEqual(1);
    });
  });
});
