import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PaneButton = ({
  icon, text, handleClick, disabled,
}) => (
  <button className="PaneBtn" type="button" onClick={handleClick} disabled={disabled}>
    <span className="PaneBtn__icon">
      <img src={icon} draggable="false" alt="icon" />
    </span>
    <div className="PaneBtn__label">{text}</div>
  </button>
);
PaneButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};
PaneButton.defaultProps = {
  icon: '',
  text: '',
  handleClick: null,
  disabled: false,
};
export default PaneButton;
