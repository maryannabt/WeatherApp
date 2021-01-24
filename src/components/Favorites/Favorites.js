import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import FavoriteItem from "./FavoriteItem";

const Favorites = props => {
  const { sideDrawerOpen, error, favorites } = props.mainReducer;

  if (error) {
    return (
      <Wrapper sideDrawerOpen={sideDrawerOpen}>
        <ErrorMsg>{`${error.message}. Try searching again later.`}</ErrorMsg>
      </Wrapper>
    );
  }

  return (
    <Wrapper sideDrawerOpen={sideDrawerOpen}>
      <Title>Favorites</Title>
      <Container>
        {favorites.length > 0 &&
          favorites.map(city => (
            <FavoriteItem key={city.cityKey} city={city} />
          ))}

        {favorites.length === 0 && <ErrorMsg>No favorites to show</ErrorMsg>}
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  const { mainReducer } = state;

  return {
    mainReducer
  };
};

export default connect(mapStateToProps, null)(Favorites);

const ErrorMsg = styled.h2`
  background-color: rgba(231, 76, 60, 0.6);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 3px;
  font-size: 2rem;
`;

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

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 3.2rem;
  margin: 2.2rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
