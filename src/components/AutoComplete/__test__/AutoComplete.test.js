/* eslint-disable func-names */
import 'babel-polyfill';
import React from 'react';
import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AutoComplete from '../index';

import filter from '../../../assets/filter.png';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
configure({ adapter: new Adapter() });

describe('<AutoComplete />', function () {
  let testComp;
  beforeEach(() => {
    jest.resetModules();
    this.params = {
      isOpen: true,
      switchHandler: jest.fn(),
      placeHolder: '',
      data: null,
    };

    this.makeSubject = () => {
      const { isOpen, switchHandler, placeHolder, data } = this.params;

      testComp = shallow(
        <AutoComplete
          isOpen={isOpen}
          switchHandler={switchHandler}
          placeHolder={placeHolder}
          data={data}
        />,
      );
      return testComp;
    };
  });
  describe('when it has complete data', () => {
    beforeEach(() => {
      this.params.placeHolder = 'Test...';
      this.subject = this.makeSubject();
    });
    it('should be same as snapshot', async () => {
      const wrapper = render(await testComp);
      expect(wrapper).toMatchSnapshot();
    });
    it('should be three options', async () => {
      expect(
        testComp.find('.AutoComplete__tooltip__list__option'),
      ).toHaveLength(3);
    });
    // 測試icon
    it('should render icon', () => {
      expect(testComp.find('img').prop('src')).toEqual(filter);
    });
    // 測試text
    it('should render text', () => {
      expect(testComp.find('.AutoComplete__button').text()).toEqual(
        'Test:option1',
      );
    });
    // 測試按下 button 會觸發 swichOptionHandler
    it('test click event', () => {
      testComp.find('button').simulate('click');
      expect(this.params.swichOptionHandler.mock.calls.length).toEqual(1);
    });
    // 測試按下選項
    it('test click event', () => {
      testComp
        .find('.AutoComplete__tooltip__list__option')
        .at(0)
        .simulate('click');
      expect(this.params.swichOptionHandler.mock.calls.length).toEqual(1);
      expect(this.params.handleClickDispatch.mock.calls.length).toEqual(1);
    });
  });
});
