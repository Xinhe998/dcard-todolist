import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import Modal from '../Modal';
import ImportanceSelect from './ImportanceSelect';

const ImportanceModal = ({ isOpen, switchHandler, currentTask }) => {
  const importanceOptions = ['High', 'Medium', 'Low'];
  const current = currentTask();
  const dispatch = useContext(Store);
  const handleSelect = (option) => {
    dispatch(action.updateImportance({
      id: current.id,
      importance: option,
    }));
    switchHandler(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      title="Importance"
      onClose={() => switchHandler(false)}
      shouldCloseOnEsc
      showControlBtn={false}
    >
      <ImportanceSelect
        options={importanceOptions}
        active={current ? current.importance : ''}
        onSelect={handleSelect}
      />
    </Modal>
  );
};

ImportanceModal.propTypes = {
  isOpen: PropTypes.bool,
  switchHandler: PropTypes.func,
  currentTask: PropTypes.func,
};

ImportanceModal.defaultProps = {
  isOpen: false,
  switchHandler: null,
  currentTask: null,
};
export default ImportanceModal;
