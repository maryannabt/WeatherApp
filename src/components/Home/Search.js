import React from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getSuggestions,
  clearSuggestions,
  clearError,
  getWeather
} from "../../store/action";
import { useDebounce } from "../../utils/useDebounce";

const Search = props => {
  const [searchBarText, setSearchBarText] = useState("");
  const [searchState, setSearchState] = useState({
    searchBarActive: false,
    searchBarPH: "Search by city..."
  });

  // Debounce search text so that it only gives us latest value if searchBarText has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing so that we aren't hitting our API rapidly.
  const debouncedSearchBarText = useDebounce(searchBarText, 500);

  const { nightMode, suggestions, error } = props.mainReducer;
  const { getSuggestions, clearSuggestions, clearError, getWeather } = props;

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchBarText) {
        if (error) {
          clearError();
        }
        getSuggestions(debouncedSearchBarText);
      } else {
        clearSuggestions();
      }
    },
    [debouncedSearchBarText] // Only call effect if debounced search text changes
  );

  const activateSearch = () => {
    setSearchState({ searchBarActive: true, searchBarPH: "" });
  };

  const deactivateSearch = () => {
    setSearchState({
      searchBarActive: false,
      searchBarPH: "Search by city..."
    });
  };

  const fetchWeather = data => {
    setSearchBarText(data.cityName);
    getWeather(data);
  };

  return (
    <Wrapper nightMode={nightMode}>
      <SearchBar>
        <Input
          type="text"
          value={searchBarText}
          placeholder={searchState.searchBarPH}
          onChange={e => setSearchBarText(e.target.value)}
          onFocus={activateSearch}
          onBlur={deactivateSearch}
        />
        <IconContainer>
          <FontAwesomeIcon icon={faSearch} />
        </IconContainer>

        {searchState.searchBarActive &&
          searchBarText.searchValue !== "" &&
          suggestions.length > 0 && (
            <SearchResult
              suggestions={suggestions}
              fetchWeather={fetchWeather}
            />
          )}
      </SearchBar>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  const { mainReducer } = state;

  return {
    mainReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSuggestions: query => dispatch(getSuggestions(query)),
    clearSuggestions: () => dispatch(clearSuggestions()),
    clearError: () => dispatch(clearError()),
    getWeather: data => dispatch(getWeather(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const Wrapper = styled.div`
  width: 100%;
  color: white;
  background-color: ${props =>
    props.nightMode ? "rgba(255,255,255,.2)" : "rgba(0, 0, 0, 0.4)"};
  border-radius: 2px;
  padding: 3rem;
  margin: 1.5rem 0;

  @media only screen and (max-width: 600px) {
    background-color: transparent;
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 2px solid rgb(52, 152, 219);
`;

const IconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;

  & svg {
    font-size: 2.5rem;
  }
`;

const Input = styled.input`
  flex-basis: 95%;
  padding: 0.5rem 0;
  font-size: 2rem;
  background-color: transparent;
  border: unset;
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
    opacity: 1;
  }
`;
