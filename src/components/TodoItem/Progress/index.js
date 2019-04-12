import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Progress = ({ total, current }) => {
  const progressbar = [];
  for (let i = 0; i < total; i += 1) {
    progressbar.push(<div className={i <= current - 1 ? 'Progress__bar Progress__bar--active' : 'Progress__bar'} />);
  }
  return (
    <div className="Progress__wrapper">
      {current > 0 ? progressbar : null}
    </div>
  );
};

Progress.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
};
Progress.defaultProps = {
  total: 3,
  current: 1,
};
export default Progress;
