import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Store from '../../reducers/context';
import * as action from '../../actions/todoActions';
import useClickOutside from '../../hooks/useClickOutside';

import noResult from '../../assets/no_result.png';

import './index.scss';

const AutoComplete = ({
  isOpen, switchHandler, placeHolder, data,
}) => {
  const dispatch = useContext(Store);
  const searchRef = useRef();
  const autocompleteRef = useRef();
  const [searchText, setSearchText] = useState('');
  const searchResult = data.filter(d => d.text.includes(searchText) && searchText !== '');
  useClickOutside(isOpen, autocompleteRef, () => {
    setSearchText('');
    searchRef.current.classList.add('closing');
    setTimeout(() => {
      searchRef.current.classList.remove('closing');
      switchHandler(false);
    }, 300);
  });
  return (
    <div
      className={isOpen ? 'AutoComplete AutoComplete--active' : 'AutoComplete'}
      ref={autocompleteRef}
    >
      <div className="AutoComplete__form-wrapper">
        {isOpen ? (
          <form className="AutoComplete__form">
            <input
              type="text"
              className="AutoComplete__form__input"
              placeholder={placeHolder}
              ref={searchRef}
              onChange={e => setSearchText(e.target.value)}
            />
          </form>
        ) : null}
        <button
          type="button"
          className="AutoComplete__button"
          onClick={() => {
            switchHandler(true);
            setTimeout(() => {
              if (searchRef.current) searchRef.current.focus();
            }, 500);
          }}
        >
          <svg width="30" height="30" viewBox="0 0 36 36">
            <title>Search</title>
            <path
              d="M20.5 22.621l2.146-1.8L28 27.2 25.853 29 20.5 22.621zm-3.479-.618c3.327 0 6.022-2.688 6.022-6.001 0-3.314-2.695-6.002-6.022-6.002C13.695 10 11 12.688 11 16.002c0 3.313 2.695 6.001 6.021 6.001zm0 2c-4.43 0-8.021-3.582-8.021-8.001C9 11.582 12.591 8 17.021 8c4.43 0 8.022 3.582 8.022 8.002 0 4.419-3.592 8.001-8.022 8.001z"
              fillRule="nonzero"
              fill="#d8d8d8"
            />
          </svg>
        </button>
      </div>
      {isOpen && searchText ? (
        <div className="AutoComplete__result-wrapper">
          <ul className="AutoComplete__result-list">
            {searchResult.length ? (
              searchResult.map(item => (
                <li
                  key={item.id}
                  onClick={() => {
                    dispatch(action.setTaskShowingDetail({ id: item.id }));
                    switchHandler(false);
                    setSearchText('');
                  }}
                >
                  {item.text}
                </li>
              ))
            ) : (
              <div className="AutoComplete__result__no-result-wrapper">
                <img className="AutoComplete__result__no-result-img" src={noResult} alt="no search result." />
                <p className="AutoComplete__result__no-result-info">No Result</p>
              </div>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

AutoComplete.propTypes = {
  isOpen: PropTypes.bool,
  switchHandler: PropTypes.func,
  placeHolder: PropTypes.string,
  data: PropTypes.array,
};
AutoComplete.defaultProps = {
  isOpen: false,
  switchHandler: null,
  placeHolder: '',
  data: [],
};
export default AutoComplete;
