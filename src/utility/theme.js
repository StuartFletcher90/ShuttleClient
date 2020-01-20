export default {
  palette: {
    primary: {
      light: "#C261FF",
      main: "#673ab7",
      dark: "#482880",
      contrastText: "#FFFAF7"
    },
    secondary: {
      light: "#8561c5",
      main: "#ffeb3b",
      dark: "#E0CE2B",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center",
    color: "white"
  },
  image: {
    margin: "8em auto 20px auto",
    maxWidth: 180,
    maxHeight: 100,
    webkitAnimation: "example 3s infinite alternate",
    animation: "example 5s infinite alternate"
  },

  pageTitle: {
    margin: "20px auto 20px auto",
    textShadow: "2px 2px black",

    color: "#673ab7 !important"
  },
  TextField: {
    margin: "10px auto 10px auto"
  },
  input: {
    color: "white",
    borderBottomColor: "white"
  },
  labelRoot: {
    color: "white",
    borderBottomColor: "white !important"
  },
  Button: {
    margin: 25,
    position: "relative",
    "&:hover": {
      boxShadow: "0px 1px 20px 10px #DDDCE0",
      color: "white"
    }
  },
  progress: {
    position: "absolute"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },

  signupLink: {
    color: "red !important",
    borderBottom: "1px solid red"
  },
  //? Signup page extras
  imageUfo: {
    margin: "40px auto 20px auto",
    maxWidth: 180,
    maxHeight: 100,
    webkitAnimation: "Ufo 3s infinite alternate",
    animation: "Ufo 10s infinite alternate"
  }
};
