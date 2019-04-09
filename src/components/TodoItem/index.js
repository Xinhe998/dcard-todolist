import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TodoItem = ({
  text,
  isComplete,
  onClickCheckbox,
  del,
  showGlow,
  date,
  importance,
  allowEdit,
  handleEdit,
  handleFocus,
  handleBlur,
  EditInputPlaceholder,
  handleClick,
  inputRef,
}) => (
  <div
    className={
      showGlow
        ? 'CardScrollView__item CardScrollView__item--glow'
        : 'CardScrollView__item'
    }
    onClick={handleClick}
  >
    <input
      type="checkbox"
      checked={isComplete}
      onClick={onClickCheckbox}
      onChange={() => {}}
    />
    {allowEdit ? (
      <input
        type="text"
        className="editInput"
        disabled={isComplete}
        value={text}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleEdit}
        placeholder={EditInputPlaceholder}
        ref={inputRef}
      />
    ) : (
      <>
        <label className="CardScrollView__item__importance">{importance}</label>
        <label className="CardScrollView__item__text">{text}</label>
      </>
    )}
    {date && !isComplete ? (
      <label className="CardScrollView__item__date">{date.toString()}</label>
    ) : null}
    {isComplete ? (
      <>
        <div className="stroke" />
        <div
          className="delBtn"
          onClick={(e) => {
            e.stopPropagation();
            del();
          }}
        />
      </>
    ) : null}
  </div>
);

TodoItem.propTypes = {
  text: PropTypes.string,
  isComplete: PropTypes.bool,
  onClickCheckbox: PropTypes.func,
  del: PropTypes.func,
  showGlow: PropTypes.bool,
  allowEdit: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  EditInputPlaceholder: PropTypes.string,
  handleClick: PropTypes.func,
  date: PropTypes.string,
  importance: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
TodoItem.defaultProps = {
  text: '',
  isComplete: false,
  onClickCheckbox: null,
  del: null,
  showGlow: false,
  allowEdit: false,
  handleEdit: null,
  EditInputPlaceholder: '',
  handleClick: null,
  date: '',
  importance: '',
  inputRef: null,
  handleFocus: null,
  handleBlur: null,
};
export default TodoItem;
