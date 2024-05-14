import {
  DARK_GRAY,
  GAINSBORO,
  GRAY,
  LIGHT_GRAY,
  MAGENTA,
  BLUE,
  BLUE_DARKER,
  BLUE_LIGHTER,
  BLUE_LIGHTEST,
  BLUE_DARKEST,
  BLUE_LIGHT,
  BLUE_DARK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_LIGHTER,
  GRAY_LIGHTEST,
  GRAY_DARKER,
  GRAY_DARKEST,
  ORANGE_DARKEST,
  ORANGE_DARKER,
  ORANGE_DARK,
  ORANGE,
  ORANGE_LIGHT,
  ORANGE_LIGHTER,
  ORANGE_LIGHTEST,
  CREAM_LIGHTEST,
  CREAM_LIGHTER,
  CREAM_LIGHT,
  CREAM,
  CREAM_DARK,
  CREAM_DARKER,
  CREAM_DARKEST,
  MAGENTA_DARKEST,
  MAGENTA_DARKER,
  MAGENTA_DARK,
  MAGENTA_LIGHT,
  MAGENTA_LIGHTER,
  MAGENTA_LIGHTEST,


  FACEBOOK,
  FACEBOOK_LIGHT,
  FACEBOOK_LIGHTER,
  FACEBOOK_LIGHTEST,
  FACEBOOK_DARK,
  FACEBOOK_DARKER,
  FACEBOOK_DARKEST,

  MINT_GREEN,
} from "../constants/palette";

export const theme: any = {
  primary: {
    darkest: BLUE_DARKEST,
    darker: BLUE_DARKER,
    dark: BLUE_DARK,
    main: BLUE,
    light: BLUE_LIGHT,
    lighter: BLUE_LIGHTER,
    lightest: BLUE_LIGHTEST,
  },

  secondary: {
    darkest: ORANGE_DARKEST,
    darker: ORANGE_DARKER,
    dark: ORANGE_DARK,
    main: ORANGE,
    light: ORANGE_LIGHT,
    lighter: ORANGE_LIGHTER,
    lightest: ORANGE_LIGHTEST,
  },

  errorTheme: {
    darkest: MAGENTA_DARKEST,
    darker: MAGENTA_DARKER,
    dark: MAGENTA_DARK,
    main: MAGENTA,
    light: MAGENTA_LIGHT,
    lighter: MAGENTA_LIGHTER,
    lightest: MAGENTA_LIGHTEST,
  },

  okTheme: {
    main: MINT_GREEN,
  },
  

  facebook: {
    darkest: FACEBOOK_DARKEST,
    darker: FACEBOOK_DARKER,
    dark: FACEBOOK_DARK,
    main: FACEBOOK,
    light: FACEBOOK_LIGHT,
    lighter: FACEBOOK_LIGHTER,
    lightest: FACEBOOK_LIGHTEST,
  },

  neutral: {
    darkest: GRAY_DARKEST,
    darker: GRAY_DARKER,
    dark: GRAY_DARK,
    main: GRAY,
    light: GRAY_LIGHT,
    lighter: GRAY_LIGHTER,
    lightest: GRAY_LIGHTEST,
  },
  allWhite: {
    darkest: "white",
    darker: "white",
    main:"white",
    light: "white",
    lighter: "white",
    lightest: "white",
  },

  h1: {
    fontFamily: "Helvetica Neue",
    fontSize: "2.125rem",
  },

  h2: {
    fontFamily: "Helvetica Neue",
    fontSize: "1.875rem",
  },

  h3: {
    fontFamily: "Helvetica Neue",
    fontSize: "1.5rem",
  },

  h4: {
    fontFamily: "Sans Serif, 'Helvetica Neue'",
    fontSize: "1.25rem",
  },

  h5: {
    fontFamily: "Helvetica Neue",
    fontSize: "1.125rem",
  },

  h6: {
    fontFamily: "Helvetica Neue",
    fontSize: "1rem",
  },
};

export const { primary, neutral, errorTheme,allWhite, h1, h2, h3, h4, h5, h6 } = theme;
