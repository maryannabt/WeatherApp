import React from "react";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { removeFromFavorites, getError } from "../../store/action";
import { getCurrentConditionsApi } from "../../accuweather-api/acuuweatherApi";
import loader from "../../img/loader.png";

const FavoriteItem = props => {
  const [currentConditions, setCurrentConditions] = useState({});

  const { imperialUnit } = props.mainReducer;
  const { removeFromFavorites, getError, city } = props;

  useEffect(() => {
    getCurrentConditionsApi(city.cityKey)
      .then(result => {
        setCurrentConditions(result.data[0]);
      })
      .catch(error => getError(error));
  }, []);

  const getCurrConditionsTemp = () => {
    if (imperialUnit) {
      return currentConditions.Temperature.Imperial.Value + " F°";
    }
    return parseInt(currentConditions.Temperature.Metric.Value) + " C°";
  };

  const removeFromFavsHandler = () => {
    removeFromFavorites(city.cityKey);
  };

  if (!Object.keys(currentConditions).length) {
    return (
      <Container>
        <Loader>
          <LoaderImg src={loader} alt="Loading..." />
        </Loader>
      </Container>
    );
  }

  return (
    <Container>
      <Link to={`/home/${city.cityKey}/${city.cityName}`}>
        <Title>{city.cityName}</Title>
        <Text>{currentConditions.WeatherText}</Text>
        <Image>
          <img
            src={`https://www.accuweather.com/images/weathericons/${currentConditions.WeatherIcon}.svg`}
            alt="Weather icon"
          ></img>
        </Image>
        <Temp>{getCurrConditionsTemp()}</Temp>
      </Link>
      <RemoveBtn onClick={removeFromFavsHandler}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </RemoveBtn>
    </Container>
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
    removeFromFavorites: cityKey => dispatch(removeFromFavorites(cityKey)),
    getError: error => dispatch(getError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: calc(25% - 1rem);
  max-width: calc(25% - 1rem);
  margin: 0.5rem;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  transition: all 0.3s;

  & a {
    color: inherit;
  }

  &:hover {
    transform: scale(1.3);
    background-color: #fff;
    cursor: pointer;
  }

  @media only screen and (max-width: 900px) {
    flex: calc(50% - 1rem);
    max-width: calc(50% - 1rem);

    &:hover {
      transform: unset;
    }
  }

  @media only screen and (max-width: 600px) {
    flex: calc(100% - 1rem);
    max-width: calc(100% - 1rem);
  }
`;

const Title = styled.div`
  padding: 1rem;
  border-bottom: 1px solid;
  font-size: 2.4rem;
  color: black;
`;

const Text = styled.div`
  margin: 1rem 0;
  font-size: 1.7rem;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 12rem;
  }
`;

const Temp = styled.div`
  font-size: 3.2rem;
  margin: 1rem 0 1rem 0;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10rem;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderImg = styled.img`
  width: 10rem;
  animation: ${rotate} infinite 2s linear;
`;

const RemoveBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.8rem;
  width: 100%;
  background-color: rgb(231, 76, 60);
  padding: 0.5rem 0;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

  & svg {
    font-size: 3.2rem;
    color: white;
  }

  &:hover {
    cursor: pointer;
  }
`;
