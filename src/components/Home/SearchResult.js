import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchResult = props => {
  return (
    <Wrapper>
      <ResultsUl>
        {props.suggestions.map(city => (
          <ResultsLi
            key={city.Key}
            onMouseDown={() =>
              props.fetchWeather({
                cityKey: city.Key,
                cityName: city.LocalizedName
              })
            }
            onTouchStart={() =>
              props.fetchWeather({
                cityKey: city.Key,
                cityName: city.LocalizedName
              })
            }
          >
            <FontAwesomeIcon icon={faSearch} />
            <span>{`${city.LocalizedName}, ${city.Country.LocalizedName}`}</span>
          </ResultsLi>
        ))}
      </ResultsUl>
    </Wrapper>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 4rem;
  left: 0;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.6);
  font-size: 2rem;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const ResultsUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResultsLi = styled.li`
  display: flex;
  width: 100%;
  height: 4.2rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
  }

  & svg {
    margin: 1rem;
  }
`;
