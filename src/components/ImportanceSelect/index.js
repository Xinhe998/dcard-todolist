import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const ImportanceSelect = ({ options, active, onSelect }) => {
  return (
    <ul className="ImportanceSelect">
      {options.map(option => (
        <li
          className={
            option === active
              ? 'ImportanceSelect__button ImportanceSelect__button--checked'
              : 'ImportanceSelect__button'
          }
          key={option}
          onClick={() => onSelect(option)}
        >
          <label className="ImportanceSelect__button__label">{option}</label>
        </li>
      ))}
    </ul>
  );
};

ImportanceSelect.propTypes = {
  options: PropTypes.array,
  active: PropTypes.string,
  handleSelect: PropTypes.func,
};

ImportanceSelect.defaultProps = {
  options: [],
  active: '',
  handleSelect: null,
};
export default ImportanceSelect;
