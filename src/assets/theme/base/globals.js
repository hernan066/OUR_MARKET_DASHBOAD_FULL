// Material Dashboard 2 React Base Styles
import colors from "assets/theme/base/colors";

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
    WebkitTextFillColor: "rgb(35, 35, 35)",
    WebkitBoxShadow: "0 0 0px 1000px rgb(249, 249, 249) inset",
    transition: "backgroundColor 5000s ease-in-out 0s",
  },
};

export default globals;
