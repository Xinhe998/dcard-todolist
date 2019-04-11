import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';

import './index.scss';

const Dropdown = ({ icon, text, options, selectedOption, swichOptionHandler }) => {
  const dispatch = useContext(Store);
  return (
    <div className="Dropdown">
      <button type="button" className="Dropdown__button">
        <img className="Dropdown__button__icon" src={icon} />
        {text}
        {selectedOption}
      </button>
    </div>
  );
};

Dropdown.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  swichOptionHandler: PropTypes.func,
};

Dropdown.defaultProps = {
  icon: '',
  text: '',
  options: [],
  selectedOption: '',
  swichOptionHandler: null,
};
export default Dropdown;
