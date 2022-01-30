import styled, { css } from "styled-components";
import { TrashLogo } from "../Svg";

export const Task = ({
  title,
  description,
  onClick,
  onClickTrash,
  isFinished,
}: {
  title: string;
  description: string;
  onClick: VoidFunction;
  onClickTrash: VoidFunction;
  isFinished: boolean;
}): JSX.Element => {
  return (
    <li>
      <Style isFinished={isFinished} onClick={onClick}>
        <div>
          <p>{title}</p>
          {description && <p>{description}</p>}
        </div>
        <label
          className="trash"
          onClick={(e) => {
            e.stopPropagation();
            onClickTrash();
          }}
        >
          {TrashLogo}
        </label>
      </Style>
    </li>
  );
};

const Style = styled.button<{ isFinished: boolean }>`
  width: 100%;
  color: ${({ theme }) => theme.colors.font};
  font-size: 15px;
  border-radius: 7px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 10px 10px 20px rgb(0 0 0 / 10%);

  ::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    border: 1px solid #0000003a;
    border-radius: 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    transition: 0.3s ease;
    transition-property: color, opacity;
    pointer-events: none;
  }

  :hover {
    box-shadow: 2px 2px 8px rgb(0 0 0 / 30%);

    ::before {
      opacity: 1;
    }
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    p:nth-child(1) {
      font-size: 21px;
    }
  }

  & > label:last-child {
    cursor: pointer;

    svg {
      height: 25px;
      fill: ${({ theme }) => theme.colors.backgroundLight};
      :hover {
        fill: ${({ theme }) => theme.colors.warning};
      }
    }
  }

  ${({ isFinished }) =>
    !isFinished
      ? css`
          background-color: ${({ theme }) => theme.colors.backgroundDark};

          :hover {
            background-color: ${({ theme }) => theme.colors.background};
          }
        `
      : css`
          background-color: ${({ theme }) => theme.colors.background};

          :hover {
            background-color: ${({ theme }) => theme.colors.backgroundDark};
          }
        `}
`;
