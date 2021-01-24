import React from "react";
import styled, { keyframes, css } from "styled-components";
import { connect } from "react-redux";
import loader from "../../img/loader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as glamorCss from "glamor";
import { addToFavorites, removeFromFavorites } from "../../store/action";
import DayForecast from "./DayForecast";

const WeatherForecast = props => {
  toast.configure({
    position: "top-center",
    autoClose: 4000,
    draggable: false,
    hideProgressBar: true,
    className: glamorCss.css({
      fontSize: "1.5rem",
      fontWeight: 700
    })
  });

  const {
    nightMode,
    error,
    loading,
    cityName,
    cityKey,
    fiveDaysWeather,
    currentConditions,
    imperialUnit,
    favorites
  } = props.mainReducer;
  const { addToFavorites, removeFromFavorites } = props;

  const isFavorite = favorites.some(city => city.cityKey === cityKey);

  const favoriteClickHandler = () => {
    if (isFavorite) {
      removeFromFavorites(cityKey);
      toast.warn(`${cityName} was removed from favorites`);
    } else {
      addToFavorites({ cityName, cityKey });
      toast.success(`${cityName} was added to favorites`);
    }
  };

  const getCurrConditionsTemp = () => {
    if (imperialUnit) {
      return currentConditions.Temperature.Imperial.Value + " F°";
    }
    return parseInt(currentConditions.Temperature.Metric.Value) + " C°";
  };

  if (error) {
    return (
      <ErrorMsg>{`${error.message}. Try searching again later.`}</ErrorMsg>
    );
  }

  if (loading && !error) {
    return (
      <Loader>
        <LoaderImg src={loader} alt="Loading..." />
      </Loader>
    );
  }

  return (
    <Wrapper>
      <CurrentConditions nightMode={nightMode}>
        <City>
          <IconContainer isFavorite={isFavorite}>
            <FontAwesomeIcon onClick={favoriteClickHandler} icon={faHeart} />
          </IconContainer>
          <TextContainer>
            <h2>{cityName}</h2>
            <CurrDate>
              {new Date(
                currentConditions.LocalObservationDateTime
              ).toDateString()}
            </CurrDate>
          </TextContainer>
        </City>

        <Temp>
          <TextContainer>
            <h2>Temperature</h2>
            <TempText>{getCurrConditionsTemp()}</TempText>
          </TextContainer>
        </Temp>

        <Condition>
          <ConditionImg
            src={`https://www.accuweather.com/images/weathericons/${currentConditions.WeatherIcon}.svg`}
            alt="Weather icon"
          />
          <h3>{currentConditions.WeatherText}</h3>
        </Condition>
      </CurrentConditions>

      <Description nightMode={nightMode}>
        {fiveDaysWeather.Headline.Text}
      </Description>

      <DaysContainer>
        {fiveDaysWeather.DailyForecasts.map((day, index) => {
          return (
            <DayForecast
              key={index}
              day={day}
              imperialUnit={imperialUnit}
              nightMode={nightMode}
            />
          );
        })}
      </DaysContainer>
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
    addToFavorites: city => dispatch(addToFavorites(city)),
    removeFromFavorites: cityKey => dispatch(removeFromFavorites(cityKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);

const ErrorMsg = styled.h2`
  background-color: rgba(231, 76, 60, 0.6);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 1rem;
  border-radius: 3px;
  font-size: 2rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
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
  width: 12rem;
  animation: ${rotate} infinite 2s linear;
`;

const fadein = keyframes`
from { opacity: 0; }
to   { opacity: 1; }
`;

const Wrapper = styled.div`
  width: 100%;
  animation: ${fadein} 2s;
  background-color: #fff;
  border-radius: 2px;
`;

const CurrentConditions = styled.div`
  display: flex;
  background: ${props =>
    props.nightMode
      ? "linear-gradient(135deg, #045FB4 0%, #084B8A 25%, #0B3861 100%)"
      : "linear-gradient(135deg, #04cdff 0%, #04cdff 25%, #0cb7e6 100%)"};
  color: #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const City = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  flex: calc(33% - 2rem) 1;

  @media only screen and (max-width: 600px) {
    flex: calc(100% - 2rem) 1;
    justify-content: center;
    align-items: center;
    border-left: unset;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    position: relative;
  }
`;

const Temp = styled(City)`
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  align-items: center;
  justify-content: center;
`;

const Condition = styled(Temp)`
  flex-direction: column;

  & h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 600px) {
    border-bottom: unset;
  }
`;

const ConditionImg = styled.img`
  width: 10rem;
  margin-bottom: 1rem;
`;

const favorite = keyframes`
{
  0%   {transform: scale(1);}
  50% {transform: scale(1.5);}
  100% {transform: scale(1);}
}
`;

const IconContainer = styled.div`
  width: 3.7rem;
  height: 3.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.2rem;
  margin-top: 0.2rem;

  @media only screen and (max-width: 600px) {
    width: 6rem;
    height: 6rem;
    position: absolute;
    top: calc(50% - 3.5rem);
    left: 2rem;
  }

  & svg {
    font-size: 3.2rem;
    color: ${props =>
      props.isFavorite ? "rgb(231,76,60)" : "rgba(0, 0, 0, 0.3)"};
    animation: ${props =>
      props.isFavorite
        ? css`
            ${favorite} 0.5s
          `
        : ""};
    transition: color 0.3s;
    cursor: pointer;

    @media only screen and (max-width: 600px) {
      font-size: 5.5rem;
    }

    &:hover {
      color: rgb(231, 76, 60);

      @media only screen and (max-width: 600px) {
        color: ${props =>
          props.isFavorite ? "rgb(231,76,60)" : "rgba(0, 0, 0, 0.3)"};
      }
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  & h2 {
    font-weight: bold;
    font-size: 2.4rem;
  }
`;

const CurrDate = styled.h4`
  color: rgba(255, 255, 255, 0.8);
  margin: 0.7rem 0;
  font-size: 1.8rem;
`;

const TempText = styled.span`
  font-size: 4.3rem;
  align-self: center;
  margin-top: 1.2rem;
`;

const Description = styled.div`
  padding: 0.5rem;
  background-color: ${props =>
    props.nightMode ? "#084B8A" : "rgba(4, 205, 255, 0.15)"};
  color: ${props => (props.nightMode ? "white" : "rgb(4, 205, 255)")};
  border-bottom: ${props =>
    props.nightMode ? "1px solid rgba(255,255,255,.2)" : "none"};
  border-top: ${props =>
    props.nightMode ? "1px solid rgba(255,255,255,.2)" : "none"};
  font-size: 2rem;
  text-align: center;
`;

const DaysContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;
