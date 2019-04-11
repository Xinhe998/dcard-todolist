import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import * as action from '../../actions/todoActions';
import Store from '../../reducers/context';
import Modal from '../Modal';
import DatePicker from '../DatePicker';

const DatePickerModal = ({ isOpen, switchHandler, currentTask }) => {
  const dispatch = useContext(Store);
  const current = currentTask();
  const [selectedDate, setSelectedDate] = useState(
    current && current.dueDate ? current.dueDate : new Date(),
  );
  const onSave = (day) => {
    dispatch(
      action.updateDueDate({
        id: current.id,
        dueDate: day,
      }),
    );
  };
  return current ? (
    <Modal
      isOpen={isOpen}
      title="Expiration date"
      onClose={() => {
        setSelectedDate(current.dueDate ? current.dueDate : new Date());
        switchHandler(false);
      }}
      Confirm={() => {
        onSave(selectedDate);
        switchHandler(false);
      }}
      shouldCloseOnEsc
      showControlBtn
    >
      <DatePicker defaultDate={selectedDate} onSelect={setSelectedDate} disabledPastDate />
    </Modal>
  ) : null;
};

DatePickerModal.propTypes = {
  isOpen: PropTypes.bool,
  switchHandler: PropTypes.func,
  currentTask: PropTypes.func,
};

DatePickerModal.defaultProps = {
  isOpen: false,
  switchHandler: null,
  currentTask: null,
};
export default DatePickerModal;
