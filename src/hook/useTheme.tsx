import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { ThemeProvider as StyledComponentsProvider } from "styled-components";

type Theme = "light" | "dark";

const themeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "dark",
  setTheme: () => undefined,
});

const darkTheme = {
  colors: {
    background: "rgba(16, 18, 27 ,0.4)",
    backgroundLight: "rgba(146, 151, 179, 0.2);",
    backgroundDark: "rgba(16, 18, 27 ,0.7)",
    font: " #ffffff",
    button: "rgba(249, 250 ,251, 0.55)",
    hover: "rgba(249, 250 ,251, 0.55)",
    logo: "rgb(8, 126, 164)",
    form: "rgb(52, 58, 70)",
    warning: "#ff0000",
  },
};

const whiteTheme = {
  colors: {
    background: "rgba(16, 18, 27 ,0.4)",
    backgroundLight: "rgba(146, 151, 179, 0.2);",
    backgroundDark: "rgba(16, 18, 27 ,0.7)",
    font: " #ffffff",
    button: "rgba(249, 250 ,251, 0.55)",
    hover: "rgba(249, 250 ,251, 0.55)",
    logo: "rgb(8, 126, 164)",
    form: "rgb(52, 58, 70)",
    warning: "#ff0000",
  },
};

export const ThemeProvider = ({
  children,
}: {
  children: NonNullable<ReactNode>;
}) => {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <themeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      <StyledComponentsProvider
        theme={theme === "dark" ? darkTheme : whiteTheme}
      >
        {children}
      </StyledComponentsProvider>
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(themeContext);

  return theme;
};
