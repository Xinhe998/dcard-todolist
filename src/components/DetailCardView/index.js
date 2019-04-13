import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TitleTextarea from './TitleTextarea';
import PaneButton from '../PaneButton';
import Notes from './Notes';
import SubTasks from '../SubTasks';

import calendarImg from '../../assets/calendar.png';
import levelImg from '../../assets/level.png';

const DetailCardView = ({
  state,
  setIsDatePickerModalOpen,
  setisImportanceModalOpen,
}) => {
  const detailCard = useRef();
  return (
    <div
      className={
        state.detailCardViewShowingGlow
          ? 'CardScrollView CardScrollView--animatedIn2 CardScrollView--glowing'
          : 'CardScrollView CardScrollView--animatedIn2'
      }
      ref={detailCard}
    >
      <div className="CardScrollView__detail">
        {state.todos.map((item) => {
          if (item.showingDetail) {
            return (
              <div key={item.id}>
                <TitleTextarea key={`${item.id}_title`} item={item} />
                <PaneButton
                  key={`${item.id}_btn1`}
                  icon={calendarImg}
                  text="Expiration date"
                  handleClick={() => setIsDatePickerModalOpen(true)}
                  disabled={item.isComplete}
                />
                <PaneButton
                  key={`${item.id}_btn2`}
                  icon={levelImg}
                  text="Priority"
                  handleClick={() => setisImportanceModalOpen(true)}
                  disabled={item.isComplete}
                />
                <Notes key={`${item.id}_note`} item={item} />
                <SubTasks key={`${item.id}_subtasks`} item={item} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

DetailCardView.propTypes = {
  state: PropTypes.object,
  setisImportanceModalOpen: PropTypes.func,
  setIsDatePickerModalOpen: PropTypes.func,
};

DetailCardView.defaultProps = {
  state: null,
  setisImportanceModalOpen: null,
  setIsDatePickerModalOpen: null,
};
export default DetailCardView;
