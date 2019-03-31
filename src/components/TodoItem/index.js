import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
    text, isComplete, onClickCheckbox, del,
}) => (
    <div className="CardScrollView__item">
        <input type="checkbox" checked={isComplete} onClick={onClickCheckbox} />
        <label>{text}</label>
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
};
TodoItem.defaultProps = {
    text: '',
    isComplete: false,
    onClickCheckbox: null,
    del: null,
};
export default TodoItem;
