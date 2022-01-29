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
  background-color: ${({ theme }) => theme.colors.button};
  font-size: 13px;
  padding: 30px;
  color: ${({ theme }) => theme.colors.font};
  font-weight: bold;
  border-radius: 7px;

  :hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;
