import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Search from "./Search";
import WeatherForecast from "./WeatherForecast";
import { getWeather } from "../../store/action";
import { getGeopositionApi } from "../../accuweather-api/acuuweatherApi";

const Home = props => {
  const { sideDrawerOpen } = props.mainReducer;
  const { getWeather } = props;

  const [geoError, setGeoError] = useState(null);

  const getLocationInfo = ({ coords }) => {
    const position = `${coords.latitude},${coords.longitude}`;
    getGeopositionApi(position)
      .then(result => {
        getWeather({
          cityKey: result.data.Key,
          cityName: result.data.LocalizedName
        });
      })
      .catch(error => setGeoError(error.message));
  };

  const handleLocationError = error => {
    setGeoError(error.message);
  };

  useEffect(() => {
    if (props.match.params.cityKey && props.match.params.cityName) {
      getWeather({
        cityKey: props.match.params.cityKey,
        cityName: props.match.params.cityName
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getLocationInfo,
        handleLocationError
      );
    } else {
      setGeoError("Geolocation is not supported");
    }
  }, []);

  if (geoError) {
    return (
      <Wrapper sideDrawerOpen={sideDrawerOpen}>
        <ErrorMsg>{`${geoError}`}</ErrorMsg>
      </Wrapper>
    );
  }

  return (
    <Wrapper sideDrawerOpen={sideDrawerOpen}>
      <Search />
      <WeatherForecast />
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
    getWeather: data => dispatch(getWeather(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85rem;
  margin-top: 7.6rem;
  padding: 0.5rem;
  transition: transform 0.1s;

  @media only screen and (max-width: 900px) {
    width: 95%;
    margin: 7.6rem auto 0;
    transform: ${props =>
      props.sideDrawerOpen ? "translateX(300px)" : "translateX(0)"};
  }
`;

const ErrorMsg = styled.h2`
  background-color: rgba(231, 76, 60, 0.6);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 3px;
  font-size: 2rem;
`;
