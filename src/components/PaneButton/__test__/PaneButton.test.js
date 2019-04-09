/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaneButton from '../index';

import calendar from '../../../assets/calendar.png';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<PaneButton />', function() {
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
      const { icon, text, handleClick, disabled } = this.params;

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

    it('should be same as snapshot', () => {
      const wrapper = render(testComp);
      expect(wrapper).toMatchSnapshot();
    });
    // 測試找到一個<button>
    it('should render one <button>', () => {
      expect(testComp.find('button')).toHaveLength(1);
    });
  });
});
