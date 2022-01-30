import { ReactNode } from "react";
import styled from "styled-components";

export const Button = ({
  children,
  onClick,
}: {
  children: NonNullable<ReactNode>;
  onClick: VoidFunction;
}) => {
  return (
    <Style className="add-button" type="button" onClick={onClick}>
      {children}
    </Style>
  );
};

const Style = styled.button`
  background-color: transparent;
  font-size: 13px;
  padding: 30px;
  color: ${({ theme }) => theme.colors.button};
  font-weight: bold;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.colors.button};
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  :hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
