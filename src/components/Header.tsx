import React from "react";
import styled from "styled-components";
import { ReactLogo } from "../Svg";

export const Header = ({
  userName,
  button,
}: {
  userName: string;
  button: JSX.Element;
}): JSX.Element => {
  return (
    <Style>
      <div>
        {ReactLogo}
        <h1>Todo List</h1>
        {button}
      </div>
      <h1>Welcome to {userName}</h1>
    </Style>
  );
};

const Style = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px 20px;
  color: ${({ theme }) => theme.colors.font};

  @media screen and (max-width: 959px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 10px 15px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
      height: 40px;
      fill: ${({ theme }) => theme.colors.logo};
    }
  }
`;
