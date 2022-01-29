import { ReactNode } from "react";
import styled from "styled-components";

export const Background = ({
  children,
  className,
}: {
  children: NonNullable<ReactNode>;
  className?: string;
}) => {
  return <Style className={className}>{children}</Style>;
};

const Style = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 7px;

  @media screen and (max-width: 640px) {
    padding: 5px 20px;
  }

  @media (min-width: 640px) {
    padding: 24px 48px;
  }
`;
