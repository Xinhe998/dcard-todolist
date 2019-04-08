import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const ImportanceModal = ({ isOpen, switchHandler }) => (
  <Modal
    isOpen={isOpen}
    title="Importance"
    onClose={() => switchHandler(false)}
    shouldCloseOnEsc
    showControlBtn={false}
  >
    <ul>
      <li>High</li>
      <li>Medium</li>
      <li>Low</li>
    </ul>
  </Modal>
);

ImportanceModal.propTypes = {
  isOpen: PropTypes.bool,
  switchHandler: PropTypes.func,
};

ImportanceModal.defaultProps = {
  isOpen: false,
  switchHandler: null,
};
export default ImportanceModal;
