import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Header = ({ title }) => (
  <header className="AppHeader">
    <div className="AppHeader__logo-wrap">{title}</div>
  </header>
);
Header.propTypes = {
  title: PropTypes.string,
};
Header.defaultProps = {
  title: '',
};
export default Header;
