import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import useClickOutside from '../../hooks/useClickOutside';
import useEscCloseModal from '../../hooks/useEscCloseModal';

const Modal = ({
  isOpen,
  title,
  shouldCloseOnEsc,
  showControlBtn,
  cancelBtnText,
  confirmBtnText,
  onClose,
  Confirm,
  children,
}) => {
  const modalRef = useRef();
  useClickOutside(isOpen, modalRef, onClose);
  if (shouldCloseOnEsc) useEscCloseModal(onClose);
  return isOpen ? (
    <div className="Modal Modal__backdrop">
      <div className="Modal__wrapper" ref={modalRef}>
        <div className="Modal__title">{title}</div>
        <div className="Modal__content">{children}</div>
        {showControlBtn ? (
          <div className="Modal__button-group">
            <button
              type="button"
              className="Modal__button-group__cancel"
              onClick={onClose}
            >
              {cancelBtnText}
            </button>
            <button
              type="button"
              className="Modal__button-group__confirm"
              onClick={Confirm}
            >
              {confirmBtnText}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  showControlBtn: PropTypes.bool,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  onClose: PropTypes.func,
  Confirm: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: '',
  isOpen: false,
  shouldCloseOnEsc: true,
  showControlBtn: true,
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Save',
  onClose: null,
  Confirm: null,
  children: null,
};

export default Modal;
