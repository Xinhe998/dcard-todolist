import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import TitleTextarea from '../TitleTextarea';
import PaneButton from '../PaneButton';
import Notes from '../Notes';
import SubTasks from '../SubTasks';

import calendarImg from '../../assets/calendar.png';
import levelImg from '../../assets/level.png';

const ListCardView = ({ state, setIsDatePickerModalOpen, setisImportanceModalOpen }) => {
  const dispatch = useContext(Store);
  return (
    <div className="CardScrollView CardScrollView--animatedIn2">
      <div className="CardScrollView__detail">
        {state.todos.map((item) => {
          if (item.showingDetail) {
            return (
              <>
                <TitleTextarea item={item} />
                <PaneButton
                  icon={calendarImg}
                  text="Expiration date"
                  handleClick={() => setIsDatePickerModalOpen(true)}
                />
                <PaneButton
                  icon={levelImg}
                  text="Importance"
                  handleClick={() => setisImportanceModalOpen(true)}
                />
                <Notes item={item} />
                <SubTasks item={item} />
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

ListCardView.propTypes = {
  state: PropTypes.object,
  setisImportanceModalOpen: PropTypes.func,
  setIsDatePickerModalOpen: PropTypes.func,
};

ListCardView.defaultProps = {
  state: null,
  setisImportanceModalOpen: null,
  setIsDatePickerModalOpen: null,
};
export default ListCardView;
