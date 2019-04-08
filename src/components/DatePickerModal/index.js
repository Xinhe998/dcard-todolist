import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const DatePickerModal = ({ isOpen, switchHandler }) => (
  <Modal
    isOpen={isOpen}
    title="Pick Date"
    onClose={() => switchHandler(false)}
    shouldCloseOnEsc
    showControlBtn
  />
);

DatePickerModal.propTypes = {
  isOpen: PropTypes.bool,
  switchHandler: PropTypes.func,
};

DatePickerModal.defaultProps = {
  isOpen: false,
  switchHandler: null,
};
export default DatePickerModal;
