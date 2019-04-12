import React from 'react';
import PropTypes from 'prop-types';
import Progress from './Progress';

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
  hasProgress,
}) => (
  <div
    className={
      showGlow
        ? 'CardScrollView__item CardScrollView__item--glow'
        : 'CardScrollView__item'
    }
    onClick={handleClick}
  >
    {hasProgress ? <Progress total={3} current={importance} /> : null}
    <div className={hasProgress && importance ? 'CardScrollView__item__main-content CardScrollView__item__main-content--has-progressbar' : 'CardScrollView__item__main-content'}>
      <input
        type="checkbox"
        checked={isComplete}
        onClick={onClickCheckbox}
        onChange={() => {}}
        value={isComplete}
      />
      {allowEdit ? (
        <input
          type="text"
          className="editInput"
          disabled={isComplete}
          onChange={handleEdit}
          value={text}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={EditInputPlaceholder}
          ref={inputRef}
        />
      ) : (
        <>
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
            onClick={e => {
              e.stopPropagation();
              del();
            }}
          />
        </>
      ) : null}
    </div>
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
  importance: PropTypes.number,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  hasProgress: PropTypes.bool,
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
  importance: 0,
  inputRef: null,
  handleFocus: null,
  handleBlur: null,
  hasProgress: false,
};
export default TodoItem;
