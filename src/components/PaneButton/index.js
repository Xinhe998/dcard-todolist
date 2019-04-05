import React from 'react';
import PropTypes from 'prop-types';

const PaneButton = ({ icon, text }) => (
  <button className="PaneBtn" type="button">
    <span className="PaneBtn__icon">
      <img src={icon} draggable="false" alt="icon" />
    </span>
    <div className="PaneBtn__label">{text}</div>
  </button>
);
PaneButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};
PaneButton.defaultProps = {
  icon: '',
  text: '',
};
export default PaneButton;
