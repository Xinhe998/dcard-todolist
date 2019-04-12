import 'babel-polyfill';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Store from '../../../reducers/context';
import TaskAddBar from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('<TaskAddBar />', () => {
  it('should trigger dispatch when adding new todo', () => {
    const dispatch = jest.fn();
    const testComp = mount(
      <Store.Provider value={dispatch}>
        <TaskAddBar />
      </Store.Provider>,
    );

    testComp
      .find('input')
      .simulate('change', { target: { value: 'a new todo' } });
    testComp.find('button').simulate('click');

    expect(dispatch).toBeCalledWith(
      expect.objectContaining({ type: 'ADD_TODO' }, { text: 'a new todo' }),
    );
  });
});
