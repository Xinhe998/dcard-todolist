import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import useClickOutside from '../../hooks/useClickOutside';

import './index.scss';

const Dropdown = ({ icon, text, options, swichOptionHandler, isOpen }) => {
  const dispatch = useContext(Store);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef();
  useClickOutside(isOpen, dropdownRef, () => swichOptionHandler(false));
  return (
    <div className="Dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="Dropdown__button"
        onClick={() => swichOptionHandler(!isOpen)}
      >
        <img className="Dropdown__button__icon" src={icon} />
        {text}
        {selectedOption}
      </button>
      {isOpen ? (
        <div className="Dropdown__tooltip">
          <ul className="Dropdown__tooltip__list">
            {options.map(option => (
              <li
                onClick={() => {
                  setSelectedOption(option);
                  swichOptionHandler(false);
                }}
                className={selectedOption === option ? 'active' : ''}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

Dropdown.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  options: PropTypes.array,
  // selectedOption: PropTypes.string,
  swichOptionHandler: PropTypes.func,
};

Dropdown.defaultProps = {
  icon: '',
  text: '',
  options: [],
  // selectedOption: '',
  swichOptionHandler: null,
};
export default Dropdown;
