import styled, { css } from "styled-components";

export const Task = ({
  title,
  description,
  onClick,
  isFinished,
}: {
  title: string;
  description: string;
  onClick: VoidFunction;
  isFinished: boolean;
}): JSX.Element => {
  return (
    <li>
      <Style isFinished={isFinished} onClick={onClick}>
        <p>{title}</p>
        <p>{description}</p>
      </Style>
    </li>
  );
};

const Style = styled.button<{ isFinished: boolean }>`
  ${({ isFinished }) =>
    isFinished
      ? css`
          background-color: ${({ theme }) => theme.colors.backgroundDark};
          width: 100%;
          color: ${({ theme }) => theme.colors.font};
          font-size: 15px;
          border-radius: 7px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 12px;

          p:nth-child(1) {
            font-size: 21px;
          }
        `
      : css`
          background-color: ${({ theme }) => theme.colors.background};
          width: 100%;
          color: ${({ theme }) => theme.colors.font};
          font-size: 15px;
          border-radius: 7px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 12px;

          p:nth-child(1) {
            font-size: 21px;
          }
        `}
`;
