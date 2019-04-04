import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TodoItem = ({
    text, isComplete, onClickCheckbox, del, showGlow, allowEdit, handleEdit, EditInputPlaceholder,
}) => (
    <div className={showGlow ? 'CardScrollView__item CardScrollView__item--glow' : 'CardScrollView__item'}>
        <input type="checkbox" checked={isComplete} onClick={onClickCheckbox} />
        {allowEdit ? (
            <input
                type="text"
                className="editInput"
                disabled={isComplete}
                value={text}
                onChange={handleEdit}
                placeholder={EditInputPlaceholder}
            />
        )
            : <label>{text}</label>
        }
        {
            isComplete ? (
                <>
                    <div className="stroke" />
                    <div className="delBtn" onClick={del} />
                </>
            )
                : null
        }
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
    EditInputPlaceholder: PropTypes.string,
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
};
export default TodoItem;
