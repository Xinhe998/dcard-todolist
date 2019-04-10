import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '../AutoComplete';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import './index.scss';

const Header = ({ title, state }) => {
  const dispatch = useContext(Store);
  const [serchBoxIsOpen, setSerchBoxIsOpen] = useState(false);
  return (
    <header className="AppHeader">
      <div className="AppHeader__logo-wrap">{title}</div>
      <AutoComplete
        isOpen={serchBoxIsOpen}
        switchHandler={setSerchBoxIsOpen}
        placeHolder="Search for tasks…"
        data={state.todos}
      />
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  state: PropTypes.object,
};
Header.defaultProps = {
  title: '',
  state: [],
};
export default Header;
