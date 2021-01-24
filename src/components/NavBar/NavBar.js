import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCloudSun,
  faHome,
  faHeart,
  faMoon,
  faTemperatureHigh
} from "@fortawesome/free-solid-svg-icons";

const NavBar = props => {
  return (
    <Toolbar>
      <ToolbarNav>
        <ToolbarToggle open={props.sideDrawerOpen}>
          <ToggleButton onClick={props.toggleSideDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </ToggleButton>
        </ToolbarToggle>

        <ToolbarTitle>
          <IconContainer>
            <FontAwesomeIcon icon={faCloudSun} />
          </IconContainer>
          Weather App
        </ToolbarTitle>

        <ToolbarUl>
          <ToolbarLi>
            <ToolbarTitle as={Link} to="/home">
              <IconContainer>
                <FontAwesomeIcon icon={faHome} />
              </IconContainer>
              Home
            </ToolbarTitle>
          </ToolbarLi>
          <ToolbarLi>
            <ToolbarTitle as={Link} to="/favorites">
              <IconContainer>
                <FontAwesomeIcon icon={faHeart} />
              </IconContainer>
              Favorites
            </ToolbarTitle>
          </ToolbarLi>
        </ToolbarUl>

        <Spacer />

        <ToolbarTitle>
          <IconContainer>
            <FontAwesomeIcon icon={faTemperatureHigh} />
          </IconContainer>
          C/F
          <TempSwitchButton
            switch={props.imperialUnit}
            onClick={props.changeTempUnit}
            nightMode={props.nightMode}
          >
            <SwitchSpan />
          </TempSwitchButton>
        </ToolbarTitle>

        <ToolbarTitle>
          <IconContainer>
            <FontAwesomeIcon icon={faMoon} />
          </IconContainer>
          Night mode
          <NightSwitchButton
            switch={props.nightMode}
            onClick={props.changeNightMode}
          >
            <SwitchSpan />
          </NightSwitchButton>
        </ToolbarTitle>
      </ToolbarNav>
    </Toolbar>
  );
};

export default NavBar;

const Toolbar = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 2.6rem;
  box-shadow: 0 0 6px 0px rgba(0, 0, 0, 0.7);
  color: white;
  height: 7.6rem;
  font-family: "Courier Prime", monospace;
`;

const ToolbarNav = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 1rem;
`;

const ToolbarTitle = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const ToolbarToggle = styled.div`
  height: 100%;
  display: ${props => (props.open ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media only screen and (min-width: 901px) {
    display: none;
  }
`;

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-right: 0.6rem;

  & svg {
    font-size: 2rem;
  }
`;

const ToggleButton = styled.div`
  width: 5.6rem;
  height: 4.6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    font-size: 4rem;
    cursor: pointer;
  }
`;

const ToolbarUl = styled.ul`
  display: flex;
  margin-left: 2rem;
  height: 100%;
`;

const ToolbarLi = styled.li`
  & a {
    color: white;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const NightSwitchButton = styled.div`
  width: 6rem;
  height: 3rem;
  background-color: ${props =>
    props.switch ? "#04cdff" : "rgba(0, 0, 0, 0.20)"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
  cursor: pointer;
  border-radius: 3.4rem;
  display: flex;
  justify-content: ${props => (props.switch ? "flex-end" : "flex-start")};
  align-items: center;
  padding: 0 0.2rem;
  transition: 0.2s;
  margin-left: 1rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${props =>
      props.switch ? "#04cdff" : "rgba(0, 0, 0, 0.3)"};
  }
`;

const TempSwitchButton = styled(NightSwitchButton)`
  background-color: ${props =>
    props.nightMode && !props.switch
      ? "rgba(255,255,255,0.20)"
      : !props.nightMode && !props.switch
      ? "rgba(0, 0, 0, 0.20)"
      : "#04cdff"};

  &:hover {
    background-color: ${props =>
      props.nightMode && !props.switch
        ? "rgba(255,255,255,0.20)"
        : !props.nightMode && !props.switch
        ? "rgba(0, 0, 0, 0.3)"
        : "#04cdff"};
  }
}
`;

const SwitchSpan = styled.div`
  width: 2.6rem;
  height: 2.8rem;
  background-color: white;
  border-radius: 50%;
`;
