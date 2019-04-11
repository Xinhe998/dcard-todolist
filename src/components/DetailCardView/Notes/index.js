import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Store from '../../../reducers/context';
import * as action from '../../../actions/todoActions';
import useAutoSize from '../../../hooks/useAutoSize';

const Notes = ({ item }) => {
  const dispatch = useContext(Store);
  const taskNoteRef = useRef();
  useAutoSize(taskNoteRef);
  return (
    <div className="CardScrollView__detail__block">
      <div className="CardScrollView__detail__block__title">Notes</div>
      <textarea
        className="CardScrollView__detail__block__textarea"
        ref={taskNoteRef}
        value={item.note}
        disabled={item.isComplete}
        onChange={e => dispatch(
          action.updateTodoNote({
            id: item.id,
            note: e.target.value,
          }),
        )
        }
        placeholder="Insert your notes here"
      />
    </div>
  );
};

Notes.propTypes = {
  item: PropTypes.object,
};

Notes.defaultProps = {
  item: null,
};
export default Notes;
