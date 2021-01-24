import React from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
  changeNightMode,
  changeTempUnit,
  toggleSideDrawer
} from "./store/action";
import NavBar from "./components/NavBar/NavBar";
import SideDrawer from "./components/NavBar/SideDrawer";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import BgImgDay from "./img/sunny.jpg";
import BgImgNight from "./img/nighty.jpeg";

const App = props => {
  const { nightMode, imperialUnit, sideDrawerOpen } = props.mainReducer;
  const { changeNightMode, changeTempUnit, toggleSideDrawer } = props;

  return (
    <Router>
      <Wrapper nightMode={nightMode}>
        <NavBar
          toggleSideDrawer={toggleSideDrawer}
          sideDrawerOpen={sideDrawerOpen}
          changeNightMode={changeNightMode}
          nightMode={nightMode}
          changeTempUnit={changeTempUnit}
          imperialUnit={imperialUnit}
        />
        <SideDrawer
          show={sideDrawerOpen}
          toggleSideDrawer={toggleSideDrawer}
          nightMode={nightMode}
          changeNightMode={changeNightMode}
          imperialUnit={imperialUnit}
          changeTempUnit={changeTempUnit}
        />
        <Switch>
          <Route exact path="/home/:cityKey?/:cityName?" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
          <Route component={Home} />
        </Switch>
      </Wrapper>
    </Router>
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
    changeNightMode: () => dispatch(changeNightMode()),
    changeTempUnit: () => dispatch(changeTempUnit()),
    toggleSideDrawer: () => dispatch(toggleSideDrawer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  transition: all 0.3s;
  background-image: url(${props =>
    props.nightMode ? `${BgImgNight}` : `${BgImgDay}`});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow-x: hidden;
`;
