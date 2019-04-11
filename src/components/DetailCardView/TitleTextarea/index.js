import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Store from '../../../reducers/context';
import * as action from '../../../actions/todoActions';
import useAutoSize from '../../../hooks/useAutoSize';

const TitleTextarea = ({ item }) => {
  const dispatch = useContext(Store);
  const textareaRef = useRef();
  useAutoSize(textareaRef);
  return (
    <textarea
      className="CardScrollView__detail__title"
      ref={textareaRef}
      value={item.text}
      disabled={item.isComplete}
      onChange={e => dispatch(
        action.updateTodoName({
          id: item.id,
          text: e.target.value ? e.target.value : item.text,
        }),
      )
      }
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          textareaRef.current.blur();
        }
      }}
    />
  );
};

TitleTextarea.propTypes = {
  item: PropTypes.object,
};

TitleTextarea.defaultProps = {
  item: null,
};
export default TitleTextarea;
