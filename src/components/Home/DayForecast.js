import React from "react";
import styled from "styled-components";

const DayForecast = props => {
  const { day, imperialUnit, nightMode } = props;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const dayNum = new Date(day.Date).getDay();

  const getDailyForecastTemp = () => {
    const maxTemp = day.Temperature.Maximum.Value;
    const minTemp = day.Temperature.Minimum.Value;

    if (imperialUnit) {
      return maxTemp + "° - " + minTemp + "°";
    }
    return (
      parseInt((maxTemp - 32) / 1.8) +
      "° - " +
      parseInt((minTemp - 32) / 1.8) +
      "°"
    );
  };

  return (
    <Day nightMode={nightMode}>
      <DayText>{weekdays[dayNum]}</DayText>
      <DayImg
        src={`https://www.accuweather.com/images/weathericons/${day.Day.Icon}.svg`}
        alt="Weather icon"
      />
      <DayTemp>{getDailyForecastTemp()}</DayTemp>
    </Day>
  );
};

export default DayForecast;

const Day = styled.div`
  color: ${props => (props.nightMode ? "#fff" : "#04cdff")};
  background-color: ${props => (props.nightMode ? "#084B8A" : "#fff")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 20% 1;
  height: 21rem;
  text-align: center;
  transition: transform 0.3s;
  border-radius: 2px;

  @media only screen and (min-width: 601px) {
    &:hover {
      box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.3);
      transform: scale(1.5);
    }
  }

  @media only screen and (max-width: 600px) {
    flex: 100%;
    border-bottom: 1px solid #04cdff;

    &:last-child {
      border-bottom: unset;
    }
  }
`;

const DayText = styled.h3`
  margin: 1rem 0.5rem;
  font-size: 2rem;
`;

const DayImg = styled.img`
  width: 10rem;
  margin-bottom: 1.5rem;
`;

const DayTemp = styled.div`
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;
