import styled from "styled-components";
import { SecondaryButton } from "../components/common/Buttons";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404.webp";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 120px); /* leaves room for navbar + bottom nav */
  padding: 2rem;
  text-align: center;
`;

const Code = styled.h1`
  font-size: 5rem;
  margin: 0;
  color: #ff9900;
`;

const Message = styled.p`
  font-size: 1.25rem;
  margin: 1rem 0 2rem;
  color: #444;
`;

export const NotFoundPage = () => {
  return (
    <Wrapper>
        <img
            src={NotFoundImage}
            alt="Page not found"
            style={{ maxWidth: "300px", marginBottom: "1.5rem" }}
        />
      <Message>Oops… This page doesn’t exist.</Message>

      <SecondaryButton component={Link} to="/">
        Back to Shop
      </SecondaryButton>
    </Wrapper>
  );
};
