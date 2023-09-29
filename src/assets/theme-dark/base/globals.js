// Material Dashboard 2 React Base Styles
import colors from "assets/theme-dark/base/colors";

const { info, dark } = colors;

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
  "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus": {
    "-webkit-text-fill-color": "#f1f1f1",
    "-webkit-box-shadow": "0 0 0px 1000px #20283f inset",
    transition: "background-color 5000s ease-in-out 0s",
  },
};

export default globals;
