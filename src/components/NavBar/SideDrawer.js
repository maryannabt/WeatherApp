import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faHome,
  faHeart,
  faMoon,
  faTemperatureHigh,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const SideDrawer = props => {
  return (
    <Wrapper open={props.show}>
      <ToolbarNav>
        <CloseContainer>
          <CloseButton onClick={props.toggleSideDrawer}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </CloseContainer>

        <ToolbarHeader>
          <IconContainer>
            <White>
              <FontAwesomeIcon icon={faCloudSun} />
            </White>
          </IconContainer>
          Weather App
        </ToolbarHeader>

        <ToolbarUl>
          <ToolbarLi>
            <ToolbarTitle as={Link} to="/home" onClick={props.toggleSideDrawer}>
              <IconContainer>
                <FontAwesomeIcon icon={faHome} />
              </IconContainer>
              Home
            </ToolbarTitle>
          </ToolbarLi>
          <ToolbarLi>
            <ToolbarTitle
              as={Link}
              to="/favorites"
              onClick={props.toggleSideDrawer}
            >
              <IconContainer>
                <FontAwesomeIcon icon={faHeart} />
              </IconContainer>
              Favorites
            </ToolbarTitle>
          </ToolbarLi>
        </ToolbarUl>

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
    </Wrapper>
  );
};

export default SideDrawer;

const Wrapper = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 6px 0px rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  z-index: 1;
  transform: ${props => (props.open ? "translateX(0)" : "translateX(-100%)")};
  transition: all 0.3s;
  font-size: 3rem;
  color: white;
  font-family: "Courier Prime", monospace;

  @media only screen and (min-width: 901px) {
    display: none;
  }
`;

const CloseContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 1rem;
  justify-content: flex-end;
  align-items: center;
  color: white;
  border-bottom: 1px solid #fff;
`;

const CloseButton = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & svg {
    font-size: 3.5rem;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ToolbarNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ToolbarTitle = styled.div`
  height: 7.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem 1rem 3rem;
  margin: 2rem 0;
`;

const ToolbarHeader = styled(ToolbarTitle)`
  border-bottom: 1px solid #fff;
  padding-bottom: 3rem;
`;

const IconContainer = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-right: 1.6rem;
  margin-bottom: 0.4rem;
  color: rgba(255, 255, 255, 0.5);

  & svg {
    font-size: 3rem;
  }
`;

const White = styled.span`
  color: white;
`;

const ToolbarUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const NightSwitchButton = styled.div`
  width: 7.5rem;
  height: 3.7rem;
  background-color: ${props =>
    props.switch ? "#04cdff" : "rgba(255,255,255,0.12)"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
  cursor: pointer;
  border-radius: 3.4rem;
  display: flex;
  justify-content: ${props => (props.switch ? "flex-end" : "flex-start")};
  align-items: center;
  padding: 0 0.2rem;
  transition: 0.2s;
  margin-left: 1.6rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${props =>
      props.switch ? "#04cdff" : "rgba(0, 0, 0, 0.3)"};
  }
`;

const TempSwitchButton = styled(NightSwitchButton)`
  background-color: ${props =>
    props.nightMode && !props.switch
      ? "rgba(255,255,255,0.12)"
      : !props.nightMode && !props.switch
      ? "rgba(255,255,255,0.12)"
      : "#04cdff"};

  &:hover {
    background-color: ${props =>
      props.nightMode && !props.switch
        ? "rgba(255,255,255,0.12)"
        : !props.nightMode && !props.switch
        ? "rgba(0, 0, 0, 0.3)"
        : "#04cdff"};
  }
`;

const SwitchSpan = styled.div`
  width: 3.14rem;
  height: 3.42rem;
  background-color: white;
  border-radius: 50%;
`;
