export type DesignAgentTheme = {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    primary: string;
    primarySoft: string;
    text: string;
    textMuted: string;
    danger: string;
    border: string;
    inputBackground: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: {
    fontFamily: string;
    bodyScale: number;
    headingScale: number;
  };
};

