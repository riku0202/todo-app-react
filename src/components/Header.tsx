import React from "react";
import styled from "styled-components";
import { ReactLogo } from "../Svg";

export const Header = ({ userName }: { userName: string }): JSX.Element => {
  return (
    <Style>
      <div>
        {ReactLogo}
        <h1>Todo List</h1>
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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  color: ${({ theme }) => theme.colors.font};
  font-size: 25px;

  div {
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
      height: 40px;
      fill: ${({ theme }) => theme.colors.button};
    }
  }
`;
