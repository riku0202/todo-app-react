import { ReactNode } from "react";
import styled from "styled-components";

export const Layout = ({
  children,
  className,
}: {
  children: NonNullable<ReactNode>;
  className?: string;
}): JSX.Element => {
  return (
    <Style className={className}>
      <div>
        <video width="320" height="240" autoPlay loop muted>
          <source
            src="https://assets.codepen.io/3364143/7btrrd.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div>{children}</div>
    </Style>
  );
};

const Style = styled.main`
  & > div:first-child {
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > div:last-child {
    display: flex;
    position: relative;
    z-index: 1;
    background-color: transparent;

    padding: 40px;

    @media screen and (max-width: 959px) {
      padding: 20px;
    }
  }
`;
